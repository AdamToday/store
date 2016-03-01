'use strict';
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');

var ShoppingCartSchema = new mongoose.Schema({
  items: [{type: Schema.Types.ObjectId, ref: 'CartItem'}]
});

ShoppingCartSchema.virtual('subtotal') {
  var total = 0;
  this.items.forEach(function (item) {
    total += item.price;
  });
  return total;
};

var PastOrderSchema = ShoppingCart.extend({
  date: { 
    type: Date,
    default: Date.now
  }
});

mongoose.model('ShoppingCart', ProductSchema);