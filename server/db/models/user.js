'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var Schema = mongoose.Schema;

var ContactInfoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
         ref: 'User'
    },
    phone: type: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: Number
});

var BillingInfoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
         ref: 'User'
    },
    phone: type: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: Number
});

// AW: how to differentiate between guests and authenticated users?
var schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true 
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

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);