'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Review = mongoose.model('Review');


//get all
router.get('/', function(req, res, next) {
  Review.find(req.query)
  .then(function(response){
    res.json(response);
  })
  .then(null, next);
});

//get one
router.get('/:id', function(req, res, next) {
  Review.find({_id: req.params.id})
  .then(function(response){
    res.json(response);
  })
  .then(null, next);
});

//post one
router.post('/', function(req, res, next) {
  Review.create(req.body)
  .then(function (response) {
    res.json(response);
  })
  .then(null, next);
});