'use strict';
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, enum: ["Drinking", "Bar", "Assorted"]},
    size: {type: Number, required: true},
    description: {type: String, required: true},
    ingredients: {type: String, required: true},
    picture: {type: String},
    flavor: {type: String},
    price: {type: Number, required: true},
    stockAmount: {type: Number, required: true}
});

mongoose.model('Product', ProductSchema);