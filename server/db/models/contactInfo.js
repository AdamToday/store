'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var extend = require('mongoose-schema-extend');

var ContactInfoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
         ref: 'User'
    },
    phone: {type: String, required: true},
    address: {type: String, required: true},
});

//we want to be able to store different phone numbers and addresses for billing versus shipping
var BillingInfoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
         ref: 'User'
    },
    phone: {type: String, required: true},
    address: {type: String, required: true},
});

mongoose.model('ContactInfo', ContactInfoSchema);
mongoose.model('BillingInfo', BillingInfoSchema);