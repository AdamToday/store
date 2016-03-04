'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

// api/orders/:id
router.param('id', function(req, res, next, id){
	Order.findById(id)
	.then(function(order){
		req.order = order; 
		next()
	})
	.then(null, next)
})/

//get all orders
router.get('/', function(req, res, next) {
	Order.find(req.query)
	.then(function(orders){
		res.json(orders);
	})
	.then(null, next);
});

//checkout one order
router.get('/:id/checkout', function(req, res, next) {
	if (req.order.status === 'inProgress'){
		req.order.status = 'complete'
	}
	req.order.save()
	.then(null, next);
});

//get all items (populated) for one order
router.get('/:id', function(req, res, next) {
	Order.getAllItems(req.order._id)
	.then(function(items){
		res.json(items);
  })
	.then(null, next);
});
