'use strict';
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');


var ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    ingrdients: {type: String, required: true}
    picture: {type: String},
    flavor: {type: String},
    price: {type: Number, required: true},
    stockAmount: {type: Number, required: true}
});

var ChocolateBarSchema = Product.extend({
    weight: {type: Number}
})

var DrinkingChocolateSchema = Product.extend({
    weight: {type: Number}
})

var AssortedChocolateSchema = Product.extend({
    pieces: {type: Number}
})

mongoose.model('Product', ProductSchema);
mongoose.model('ChocolateBar', ChocolateBarSchema);
mongoose.model('DrinkingChocolate', DrinkingChocolateSchema);
mongoose.model('AssortedChocolate', AssortedChocolateSchema);