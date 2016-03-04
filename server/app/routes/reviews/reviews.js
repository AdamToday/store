'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Review = mongoose.model('Review');

// api/reviews/:id
router.param('id', function(req, res, next, id){
  Review.findById(id)
  .then(function(review){
    req.review = review; 
    next();
  })
  .then(null, next)
});

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
  res.json(req.review);
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
  req.review.set(req.body)
  req.review.save()
  .then(function(updatedReview){
    res.json(updatedReview)
  })
  .then(null, next)
});

//delete one
router.delete('/:id', function(req, res, next) {
  req.review.remove()
  .then(function(){
      res.status(204).end()
  })
  .then(null, next)
});





