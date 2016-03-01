'use strict';
var mongoose = require('mongoose');

var CartItemSchema = new mongoose.Schema({
    item: {type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: {type: Number}
});

mongoose.model('CartItem', CartItemSchema);