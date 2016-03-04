'use strict';
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

require('./cartItem.js');
var CartItem = mongoose.model('CartItem');

var OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [{ type: Schema.Types.ObjectId, ref: 'CartItem'} ],
  date: { 
    type: Date,
    default: Date.now
  },
  // AW: add a purchase date 
  purchaseDate: {
    type: Date
  },
  status: { type: String, enum: ["inProgress", "complete"], default: "inProgress" }
});

OrderSchema.plugin(deepPopulate);

OrderSchema.virtual('subtotal').set(function() {
  // var total = 0;
  // this.items.forEach(function (item) {
  //   total += item.price;
  // });
  // return total;

  return items.reduce(function(acc, next){
    return acc + next.price; 
  }, 0)

});

OrderSchema.statics.findByUser = function(userId, _status, cb){
  return this.find({user: userId, status: _status})
  .then(function(ordersByUser){
    if (cb) cb(null, ordersByUser);
    return ordersByUser;
  })

  // AW: return this.find({user: userId, status: _status}).exec(cb)
};


OrderSchema.statics.getPastOrder = function(userId, cb){

  
  return this.find({user: userId, status: "complete"})
  .then(function(pastOrdersByUser){
    if (cb) cb(null, pastOrdersByUser);
    return pastOrdersByUser;
  });
};

OrderSchema.statics.getAllItems = function(orderId, cb){
  return this.findById(orderId)
  .deepPopulate('item items.item')
  .then(function(allItems){
    if (cb) cb(null, allItems);
    return allItems;
  });
};

OrderSchema.statics.findOrCreate = function (userId) {
  var self = this;

  return this.findOne({user: userId, status: "inProgress"}).exec()
    .then(function (order) {
      if (!order) {
        return self.create({user: userId});
      } else {
        return order;
      }
    });
};

OrderSchema.methods.addItem = function(itemData) {
  var order = this;
  var newItem;
  return CartItem.create(itemData)
  .then(function(_newItem) {
    newItem = _newItem;
    // AW: addToSet ?? idempotent
    order.items.push(newItem._id);
    return order.save();
  })
  .then(function() {
    return newItem;
  });
};

OrderSchema.methods.removeItem = function(itemId) {
  var order = this;
  var removeItem;
  // AW: hook issues, don't use these statics 
  return CartItem.findByIdAndRemove(itemId)
  // AW: do this instead: 
  // return CartItem.findById(itemId)
  // .then(function(item){
  //   return item.remove()
  // })
  .then(function(removed){
    // AW : order.items.pull(itemId)
      order.items.splice(order.items.indexOf(itemId),1);
      return order.save();
  })
};


mongoose.model('Order', OrderSchema);