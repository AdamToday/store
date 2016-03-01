var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Product = mongoose.model('Product');

describe('Product model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });

    describe('Validations', function () {
        var product;
        beforeEach(function () {
            product = new Product();
        });

    it('errors without name', function (done) {
        product.validate(function (err) {
            expect(err.errors.name).to.be.an('object');
            done();
        });
    });

    it('errors without size', function (done) {
        product.validate(function (err) {
            expect(err.errors.size).to.be.an('object');
            done();
        });
    });

    it('errors without description', function (done) {
        product.validate(function (err) {
            expect(err.errors.description).to.be.an('object');
            done();
        });
    });

    it('errors without ingredients', function (done) {
        product.validate(function (err) {
            expect(err.errors.ingredients).to.be.an('object');
            done();
        });
    });

    it('errors without price', function (done) {
        product.validate(function (err) {
            expect(err.errors.price).to.be.an('object');
            done();
        });
    });

    it('errors without stockAmount', function (done) {
        product.validate(function (err) {
            expect(err.errors.stockAmount).to.be.an('object');
            done();
        });
    });

});
