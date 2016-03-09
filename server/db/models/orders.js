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
  purchaseDate: {
    type: Date
  },
  status: { type: String, enum: ["inProgress", "complete"], default: "inProgress" }
}, {
  toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true 
    }

});

//adds deepPopulate option to populate a reference's reference!
OrderSchema.plugin(deepPopulate);

OrderSchema.virtual('subtotal').get(function() {
  var self = this;
  var arr = [];
  for (var i = 0; i < self.items.length; i++) {
    arr.push(self.items[i].item.price * self.items[i].quantity)
  }
  return arr.reduce(function(acc, next){
    return acc + next;
  }, 0);
});

OrderSchema.statics.findByUser = function(userId, _status, cb){
  return this.find({user: userId, status: _status})
  .deepPopulate('item items.item')
  .then(function(ordersByUser){
    if (cb) cb(null, ordersByUser);
    return ordersByUser;
  });
  // AW: return this.find({user: userId, status: _status}).exec(cb)
};


OrderSchema.statics.getPastOrder = function(userId, cb){
  return this.find({user: userId, status: "complete"})
  .deepPopulate('user item items.item')
  .then(function(pastOrdersByUser){
    if (cb) cb(null, pastOrdersByUser);
    return pastOrdersByUser;
  });
};

OrderSchema.statics.getAllItems = function(orderId, cb){
  return this.findById(orderId)
  .deepPopulate('user item items.item')
  .then(function(allItems){
    if (cb) cb(null, allItems);
    return allItems;
  });
};

OrderSchema.statics.findOrCreate = function (userId) {
  var self = this;

  return this.findOne({user: userId, status: "inProgress"})
  .deepPopulate('item items.item')
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
    order.items.addToSet(newItem._id);
    return order.save();
  })
  .then(function() {
    return newItem;
  });
};

OrderSchema.methods.removeItem = function(itemId) {
  var order = this;
  return CartItem.findById(itemId)
  .then(function(item){
    return item.remove();
  })
  .then(function(removed){
      order.items.pull(itemId);
      return order.save();
  });
};

OrderSchema.pre('save', function (next) {
  if(this.status === "complete") {
    this.purchaseDate = Date.now;
  }
  next();
});

mongoose.model('Order', OrderSchema);