'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Order = mongoose.model('Order');


//get all orders
router.get('/', function(req, res, next) {
	Order.find(req.query)
	.then(function(response){
		res.json(response);
	})
	.then(null, next);
});

//get one user's orders
router.get('/:userId', function(req, res, next) {
	Order.findByUser(req.params.userId)
	.then(function(response){
		res.json(response);
	})
	.then(null, next);
});


//checkout route
router.get('/:currentOrderId/checkout', function(req, res, next) {
	Order.findOneAndUpdate({_id: req.params.currentOrderId, status: "inProgress"}, {status: "complete"}, {new: true})
	.then(function(updated) {

		res.json(updated);
	})
	.then(null, next);
});

//get all items (populated) for one order
router.get('/:userId/:id/all', function(req, res, next) {
	Order.getAllItems(req.params.id)
	.then(function(response){
		res.json(response);
  })
	.then(null, next);

});

//get past orders
router.get('/:userId/pastorders', function(req, res, next) {
	Order.findByUser(req.params.userId)
	.then(function(response){
		res.json(response);
	})
	.then(null, next);
});

//view current (inProgress) order, if there isn't one, create a new order
router.get('/:userId/cart', function(req, res, next) {
	Order.findByUser(req.params.userId, "inProgress")
	.then(function(response){
		if(response.length) {
			res.json(response);
		} else {
			Order.create({user: req.params.userId})
			.then(function(response) {
				res.json(response);
			});
		}
	})
	.then(null, next);
});

//supposed to remove one item from order. not working yet.
router.delete('/:userId/:itemid/', function(req, res, next){
	Order.findByUser(req.params.userId, "inProgress")
	.then(function(currentCart){
		console.log('this is currentCart',currentCart)
		console.log('this is itemid',req.params.itemid)
		return currentCart.removeItem(req.params.itemid);

	})
	.then(function(cart){
		console.log('This is updated cart: ',cart)
		res.json(cart);
	})
})
//add item to order, if no current order, create one and then add item.
router.post('/:userId/item', function(req, res, next) {
	Order.findByUser(req.params.userId, "inProgress")
	.then(function(oneCart) {
		if (oneCart.length) {
			return oneCart.addItem(req.body);
		} else {
			return Order.create({user: req.params.userId})
			.then(function(response) {
				return oneCart.addItem(req.body);
			});
		}
	})
	.then(function(response) {
		res.json(response);
	})
	.then(null, next);
});