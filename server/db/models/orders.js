'use strict';
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var CartItem = mongoose.model('CartItem');


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

OrderSchema.statics.findByUser = function(userId, cb){
  return this.find({user: userId})
  .then(function(ordersByUser){
    if (cb) cb(null, ordersByUser);
    return ordersByUser;
  });
};

OrderSchema.methods.getAllItems = function(orderId, cb){
  return this.parent.findById(this._id)
  .deepPopulate('item items.item')
  .then(function(allItems){
    if (cb) cb(null, allItems);
    return allItems;
  });
};

OrderSchema.methods.addItem = function(itemData) {
  var order = this;
  var newItem;
  return CartItem.create(itemData)
  .then(function(_newItem) {
    newItem = _newItem;
    order.items.push(newItem._id);
    return order.save();
  })
  .then(function() {
    return newItem;
  });
};

mongoose.model('Order', OrderSchema);