'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User',required: true},
    product: {type: Schema.Types.ObjectId, ref: 'Product',required: true},
    title: {type: String },
    comments: {type: String, required: true},
    rating: {type: Number, enum: [1,2,3,4,5], required: true}
});

mongoose.model('Review', ReviewSchema);