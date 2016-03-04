'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');

// api/users/:id
/* 
	router.param('id', function(req, res, next, id){
	User.findById(id)
	.then(function(user){
		req.reqUser = user; 
		next();
	})
	.then(null, next)
})

*/

//get all
router.get('/', function(req, res, next) {
	User.find(req.query)
	.then(function(response){
		res.json(response);
	})
	.then(null, next);
});

//get one

// USE router.params please!!!!!!!!!!!!!!!!
router.get('/:id', function(req, res, next) {
		/*
				res.json(req.reqUser)
		*/

	User.findById(req.params.id)
	.then(function(response){
		res.json(response);
	})
	.then(null, next);
});

//update user info
router.put('/:id', function (req, res, next) {
	User.findById(req.params.id)
	.then(function(foundUser){
		foundUser.update(req.body);
		foundUser.save();
	})
	.then(function(updatedUser) {
		console.log("updated user: ", updatedUser)
		res.json(updatedUser);
	})
	.then(null, next);
});