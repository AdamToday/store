'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User',required: true},
    product: {type: Schema.Types.ObjectId, ref: 'Product',required: true},
    title: {type: String},
    comments: {type: String, required: true},
    rating: {type: Number, enum: [1,2,3,4,5], required: true},
    date: {type: Date, default: Date.now}
});


ReviewSchema.statics.findByAuthor = function(authorId, cb){
	return this.find({author: authorId})
  .populate('product')
	.then(function(reviewsByAuthor){
		if (cb) cb(null, reviewsByAuthor);
		return reviewsByAuthor;
	});
};

ReviewSchema.statics.findByProduct = function(productId, cb){
	return this.find({product: productId})
  .populate('author')
	.then(function(reviewsByProduct){
		if (cb) cb(null, reviewsByProduct);
		return reviewsByProduct;
	});
};



mongoose.model('Review', ReviewSchema);