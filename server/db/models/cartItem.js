'use strict';
var mongoose = require('mongoose');

var CartItemSchema = new mongoose.Schema({
    item: {type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: {type: Number},
    //submitted by the post request at checout
    priceAtOrder: {type: Number}
});

mongoose.model('CartItem', CartItemSchema);