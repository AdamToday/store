'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Review = mongoose.model('Review');

// /api/products

//get all reviews for one product
router.get('/:id/reviews', function(req, res, next){
	Review.findByProduct(req.params.id)
	.then(function(response){
		console.log("reviews by product response: ", response);
		res.json(response);
	})
	.then(null, next);
});

//get all
router.get('/', function(req, res, next) {
	Product.find(req.query)
	.then(function(response){
		res.json(response);
	})
	.then(null, next);
});

//get one
router.get('/:id', function(req, res, next) {
	// AW: do a findById here!
	Product.findOne({_id: req.params.id})
	.then(function(response){
		res.json(response);
	})
	.then(null, next);
});


//add products (admin only)
router.post('/', function (req, res, next) {
	Product.create(req.body)
	.then(function (newProduct) {
		res.json(newProduct);
	})
	.then(null, next);
});

//edit products (admin only)
router.put('/:id', function (req, res, next) {
	Product.findById(req.params.id)
	.then(function(product){
		product.set(req.body);
		return product.save();
	})
	.then(function(updatedProduct) {
		res.json(updatedProduct);
	})
	.then(null, next);
});