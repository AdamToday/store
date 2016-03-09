'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Review = mongoose.model('Review');

// api/users/:id
// if dealing with a guest - the request should use the session id instead of a user id. findOrCreate will look for a user with that id and if there isn't one it will create a new user with that session id and no other info
router.param('id', function(req, res, next, id){
	console.log("reqsessid", req.session.id)
	User.findOrCreate(id, req.session.id)
	.then(function(user){
		console.log("find or create User: ", user);
		req.reqUser = user;
		next();
	})
	.then(null, next);
});

//get all users
router.get('/', function(req, res, next) {
	User.find(req.query)
	.then(function(response){
		res.json(response);
	})
	.then(null, next);
});

//get one
router.get('/:id', function(req, res, next) {
	res.json(req.reqUser);
});

//update one
router.put('/:id', function (req, res, next) {
	User.findById(req.reqUser._id)
	.then(function(user){
		user.set(req.body);
		return user.save();
	})
	.then(function(updatedUser) {
		res.json(updatedUser);
	})
	.then(null, next);
});

// api/:id/orders routes...

// get one user's orders
router.get('/:id/orders', function(req, res, next) {
	Order.findByUser(req.reqUser._id)
	.then(function(orders){
		res.json(orders);
	})
	.then(null, next);
});

// get one user's reviews
router.get('/:id/reviews', function (req, res, next) {
	Review.findByAuthor(req.reqUser._id)
	.then(function (reviews) {
		res.json(reviews);
	})
	.then(null, next);
});

//get past orders // update later to use req.query? ?status=complete
router.get('/:id/pastOrders', function(req, res, next) {
	Order.findByUser(req.reqUser._id, "complete")
	.then(function(pastOrders){
		res.json(pastOrders);
	})
	.then(null, next);
});

//view current (inProgress) order; if there isn't one, create a new order
router.get('/:id/cart', function(req, res, next) {
	console.log("hit /api/users/:id/cart!");
	console.log(":id ", req.params.id);
	Order.findOrCreate(req.reqUser._id)
	.then(function(cart) {
		console.log('cart.subtotal', cart.subtotal)
		res.json(cart);
	})
	.then(null, next);
});

// remove one item from order
router.delete('/:id/cart/items/:itemId', function(req, res, next){
	Order.findByUser(req.reqUser, "inProgress")
	.then(function(currentCart){
		return currentCart[0].removeItem(req.params.itemId);
	})
	.then(function(updatedCart){
		res.json(updatedCart);
	});
});

// add item to order, if no current order, create one and then add item.
router.post('/:id/cart/items', function(req, res, next) {
	Order.findOrCreate(req.reqUser._id)
	.then(function(cart) {
		return cart.addItem(req.body);
	})
	.then(function(updatedCart) {
		res.json(updatedCart);
	})
	.then(null, next);
});
