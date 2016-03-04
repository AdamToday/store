'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartItemSchema = new Schema({
    item: {type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: {type: Number},
    //submitted by the post request at checkout
    priceAtOrder: {type: Number}
});

mongoose.model('CartItem', CartItemSchema);