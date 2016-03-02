'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Order = mongoose.model('Order');


//get all
router.get('/', function(req, res, next) {
	Order.find(req.query)
	.then(function(response){
		res.json(response);
	})
	.then(null, next);
});

//get one
router.get('/:userId', function(req, res, next) {
	Order.findByUser(req.params.userId)
	.then(function(response){
		res.json(response);
	})
	.then(null, next);
});

router.get('/:userId/:id', function(req, res, next) {
	Order.find(req.params.id)
	.then(function(response){
		res.json(response);
	})
	.then(null, next);
});

//post new Order
router.post('/', function(req, res, next) {
	Order.create(req.body)
	.then(function(response) {
		res.json(response);
	})
	.then(null, next);
});

router.post('/:id/item', function(req, res, next) {
	Order.findById(req.params.id)
	.then(function(oneCart) {
		return oneCart.addItem(req.body);
	})
	.then(function(response) {
		res.json(response);
	})
	.then(null, next);
});