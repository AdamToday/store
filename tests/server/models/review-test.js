var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');


// Require in all models.
require('../../../server/db/models');

var Review = mongoose.model('Review');
var User = mongoose.model('User');

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
                expect(err.errors.user).to.be.an('object');
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
         var user, review; 

         var createUser = function () {
                return User.create({email: 'obama@gmail.com', firstName: 'Barak', lastName: 'Obama', isAdmin: false, password: 'potus' });
            };
        var createReview = function(userId) {
            return Review.create({user: userId, title: 'I love their chocolate', comments:'I love their chocolate, Michelle and I serve it to all our guests!', rating: 5 });
        };
        
        beforeEach('create new user and review', function(){
            createUser().then(function(user){
                user = user;
                review = createReview(user._id);
            });
             
        });

        it('review.user should be user._id', function (done) {
            expect(review.user).to.be.equal(user._id);
        });

        it('properties of review should be  ', function (done) {
            expect(review.title).to.be.equal('I love their chocolate');
        });
      
    }); 

});
