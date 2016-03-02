'use strict';
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [{ type: Schema.Types.ObjectId, ref: 'CartItem'} ],
  date: { 
    type: Date,
    default: Date.now
  },
  status: { type: String, enum: ["inProgress", "complete"], default: "inProgress" }
});

OrderSchema.plugin(deepPopulate);

OrderSchema.virtual('subtotal').set(function() {
  var total = 0;
  this.items.forEach(function (item) {
    total += item.price;
  });
  return total;
});

mongoose.model('Order', OrderSchema);