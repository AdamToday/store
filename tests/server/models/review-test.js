var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');

var Promise = require('bluebird'); 


// Require in all models.
require('../../../server/db/models');

var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Product = mongoose.model('Product');

describe('Review model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Review).to.be.a('function');
    });

    describe('Validations', function () {
        var review;
        beforeEach(function () {
            review = new Review();
        });
        
        it('errors without user', function (done) {
            review.validate(function (err) {
                expect(err.errors.author).to.be.an('object');
                done();
            });
        });

        it('errors without comments', function (done) {
            review.validate(function (err) {
                expect(err.errors.comments).to.be.an('object');
                done();
            });
        });

        it('errors without rating', function (done) {
            review.validate(function (err) {
                expect(err.errors.rating).to.be.an('object');
                done();
            });
        });       
    });

    describe('on creation', function () {
        var user;
        var product;
        var review; 

        var createUser = function () {
            return User.create({email: 'obama@gmail.com', firstName: 'Barak', lastName: 'Obama', isAdmin: false, password: 'potus' });
        };

        var createReview = function(userId, productId) {
            return Review.create({author: userId, product: productId,title: 'I love their chocolate', comments:'I love their chocolate, Michelle and I serve it to all our guests!', rating: 5 });
        };

        var createProduct = function() {
            return Product.create({ name: "85% Dark Venezuelan Chocolate", type: "Bar", size: 12, description: "Rich, luxurious and complicated. This single origin bar exudes confidence and notes of sophistication.", ingredients: "organic cocoa liqueur, organic cocoa butter and pure, organic cane sugar", price: 8.00, stockAmount: 37});
        };
        
        beforeEach(function(done){
            Promise.all([
                createUser(), 
                createProduct(), 
            ])
            .spread(function(_user, _product){
                user = _user; 
                product = _product; 
                done();
            })
            .catch(done);
        });

        

        beforeEach(function(done){
            createReview(user._id, product._id)
            .then(function(_review){
                review = _review; 
                done();
            })
            .then(null, done);
        });

        
      
        it('review to have a user id, a product id, title, comments and a rating', function (done) {
            expect(review.author).to.be.equal(user._id);
            expect(review.product).to.be.equal(product._id);
            expect(review.title).to.be.equal('I love their chocolate');
            expect(review.comments).to.be.equal('I love their chocolate, Michelle and I serve it to all our guests!');
            expect(review.rating).to.be.a('number');
            expect(review.rating).to.be.at.least(1);
            expect(review.rating).to.be.below(6);
            done();
        });

        it('findByAuthor', function(){
            return Review.findByAuthor(user._id).then(function(reviews){ expect(reviews).to.have.length(1);
            });
        });

        it('does not get reviews without an author', function () {
            return Review.findByAuthor('507f1f77bcf86cd799439011').then(function(reviews){ expect(reviews).to.have.length(0);
            });
        });

        it('findByProduct', function(){
                return Review.findByProduct(product._id).then(function(reviews){ expect(reviews).to.have.length(1);
                });
        });

        it('does not get reviews without a product', function () {
            return Review.findByProduct('507f1f77bcf86cd799439011').then(function(reviews){ expect(reviews).to.have.length(0);
            });
        });


    }); 

});
