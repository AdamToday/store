'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Product = mongoose.model('Product');


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
	Product.find({_id: req.params.id})
	.then(function(response){
		res.json(response);
	})
	.then(null, next);
});

//add products (admin only)

//edit products (admin only)