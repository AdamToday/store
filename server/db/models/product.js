'use strict';
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');


var ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, enum: ["Drinking", "Bar", "Assorted"]},
    size: {type: Number, required: true}
    description: {type: String, required: true},
    ingredients: {type: String, required: true},
    picture: {type: String},
    flavor: {type: String},
    price: {type: Number, required: true},
    stockAmount: {type: Number, required: true},
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}]
});

// var ChocolateBarSchema = Product.extend({
//     weight: {type: Number}
// })

// var DrinkingChocolateSchema = Product.extend({
//     weight: {type: Number}
// })

// var AssortedChocolateSchema = Product.extend({
//     pieces: {type: Number}
// })

mongoose.model('Product', ProductSchema);
// mongoose.model('ChocolateBar', ChocolateBarSchema);
// mongoose.model('DrinkingChocolate', DrinkingChocolateSchema);
// mongoose.model('AssortedChocolate', AssortedChocolateSchema);