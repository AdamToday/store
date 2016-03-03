'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Review = mongoose.model('Review');

//get all
router.get('/', function(req, res, next) {
  Review.find(req.query)
  .then(function(allReviews){
    res.json(allReviews);
  })
  .then(null, next);
});

//get one
router.get('/:id', function(req, res, next) {
  Review.find({_id: req.params.id})
  .then(function(foundReview){
    res.json(foundReview);
  })
  .then(null, next);
});

//post one
router.post('/', function(req, res, next) {
  Review.create(req.body)
  .then(function (newReview) {
    res.json(newReview);
  })
  .then(null, next);
});

//put: update a review
//security concerns? make sure only the right user can do this
router.put('/:id', function(req, res, next) {
  Review.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
  .then(function (updatedReview) {
    console.log("review was updated!");
    res.json(updatedReview);
  })
  .then(null, next);
});

//delete one
router.delete('/:id', function(req, res, next) {
  Review.findByIdAndRemove(req.params.id)
  .then(function (deletedBook) {
    console.log("review was deleted!");
    res.sendStatus(204);
  })
  .then(null, next);
});