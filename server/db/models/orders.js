'use strict';
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var ShoppingCartSchema = new Schema({
  items: [{type: Schema.Types.ObjectId, ref: 'CartItem'}]
});

ShoppingCartSchema.plugin(deepPopulate);

ShoppingCartSchema.virtual('subtotal').set(function() {
  var total = 0;
  this.items.forEach(function (item) {
    total += item.price;
  });
  return total;
});

mongoose.model('ShoppingCart', ShoppingCartSchema);

var PastOrderSchema = ShoppingCartSchema.extend({
  date: { 
    type: Date,
    default: Date.now
  }
});

mongoose.model('PastOrder', PastOrderSchema);