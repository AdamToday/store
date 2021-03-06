'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var Schema = mongoose.Schema;

//Y: updated these so they don't have foreign keys for user. they're embedded, not referenced, so they don't need that
var ContactInfoSchema = new Schema({
    phone: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: Number,
    country: String
});

var BillingInfoSchema = new Schema({
    phone: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: Number,
    country: String
});

// AW: how to differentiate between guests and authenticated users?
/* our plan: 
   email shouldn't be required
   in checkout route: if email is undefined, throw an error, prompt user for email?
*/

//add a userType instead of isAdmin to keep track of user/admin/guest to use in routes
var schema = new Schema({
    sessionId: String,
    email: {
        type: String,
        unique: true,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        enum: ["guest", "registered"],
        default: "registered"
    },
    contactInfo: [ContactInfoSchema],
    billingInfo: [BillingInfoSchema],
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    }
});

// method to remove sensitive information from user objects before sending them out
schema.methods.sanitize =  function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.virtual('fullName').get(function () {
    return this.firstName + " " + this.lastName;
});

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});


schema.statics.findOrCreate = function (id, reqSessId) {
  var self = this;
  if (id == 1) {
    console.log('in findorcreate', reqSessId, "id:", id)
    return self.findOne({sessionId: reqSessId})
    .then(function(guestUser) {
        if (guestUser) {
            return guestUser 
        } else {
            return self.create({sessionId: reqSessId, email: reqSessId, userType: "guest"});
        }
    })
    .then(function(newUser) {
        return newUser;
    });
  } else {
      return this.findById(id)
      .exec()
      .then(function(foundUser) {
        return foundUser;
      });
  }
};

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);