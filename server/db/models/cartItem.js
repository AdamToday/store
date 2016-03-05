'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// require('./orders.js');
// var Order = mongoose.model('Order');

var CartItemSchema = new Schema({
    item: {type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: {type: Number},
    //submitted by the post request at checkout
    // hook?
    priceAtOrder: {type: Number}
});

//need to figure out how to capture the priceAtOrder??

// CartItem.pre('save', function (next) {
//   if(Order.status === "complete") {
//   	this.priceAtOrder = ???
//   }
//   next();
// });

mongoose.model('CartItem', CartItemSchema);