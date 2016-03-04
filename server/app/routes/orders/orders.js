'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

// api/orders

// AW rethink all URIs, revisit REST principles if necessary 

/*
	
	AW: 
	router.param('id', function(req, res, next, id){
	Order.findById(id)
	.then(function(order){
		req.order = order; 
		next()
	})
	.then(null, next)
})
*/

//get all orders
router.get('/', function(req, res, next) {
	Order.find(req.query)
	.then(function(response){
		res.json(response);
	})
	.then(null, next);
});


// AW more RESTful for the route to be under users 
// api/users/:userId/orders

//get one user's orders
router.get('/:userId', function(req, res, next) {
	Order.findByUser(req.params.userId)
	.then(function(response){
		res.json(response);
	})
	.then(null, next);
});


//checkout route

// AW: /api/orders/:id
// AW
router.get('/:currentOrderId/checkout', function(req, res, next) {
	/*
	
	if (req.order.status = 'inProgress'){
		req.order.status = 'complete'
	}
	req.order.save()


	*/
	Order.findOneAndUpdate({_id: req.params.currentOrderId, status: "inProgress"}, {status: "complete"}, {new: true})
	.then(function(updated) {

		res.json(updated);
	})
	.then(null, next);
});

//get all items (populated) for one order
// AW for nested resources, we want: '/api/users/:userId/orders/:orderId'
router.get('/:userId/:id/all', function(req, res, next) {
	Order.getAllItems(req.params.id)
	.then(function(response){
		res.json(response);
  })
	.then(null, next);

});

//get past orders
// nothing in the uri indicates that we are retrived "past" orders
// retrieves orders associated with a user 
router.get('/:userId/pastorders', function(req, res, next) {
	Order.findByUser(req.params.userId)
	.then(function(response){
		res.json(response);
	})
	.then(null, next);
});

// AW: findOrCreate ? 

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
		return currentCart[0].removeItem(req.params.itemid);

	})
	.then(function(cart){
		console.log('This is updated cart: ',cart)
		res.json(cart);
	})
})
// AW rethink
//add item to order, if no current order, create one and then add item.
router.post('/:userId/item', function(req, res, next) {
	Order.findByUser(req.params.userId, "inProgress")
	.then(function(oneCart) {
		if (oneCart.length) {
			return oneCart[0].addItem(req.body);
		} else {
			return Order.create({user: req.params.userId})
			.then(function(response) {
				return response.addItem(req.body);
			});
		}
	})
	.then(function(response) {
		res.json(response);
	})
	.then(null, next);
});