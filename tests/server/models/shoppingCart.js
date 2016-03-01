var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');


// Require in all models.
require('../../../server/db/models');

var ShoppingCart = mongoose.model('ShoppingCart');
var Product = mongoose.model('Product');
var CartItem = mongoose.model('CartItem');


describe('ShoppingCart model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(ShoppingCart).to.be.a('function');
    });

    describe('Model reference', function () {
        var cart;
        var cartItem;
        var product;
        beforeEach(function () {
            return Product.create({name: "Fake Product", type: "Assorted", size: 9, description: "Great fake product", ingredients: "Some ingredients", price: 6.99, stockAmount: 10})
            .then(function(newProduct) {
                product = newProduct;
                return CartItem.create({item: product._id, quantity: 2});
            })
            .then(function(newCartItem) {
                cartItem = newCartItem;
                return ShoppingCart.create({items: [cartItem._id]});
            })
            .then(function(newCart) {
                cart = newCart;
            });

        });

        it('has the correct number of references', function (done) {

            return ShoppingCart.findOne({})
            .then(function(oneCart) {
                console.log("this is onecart", oneCart.items.length);
                expect(oneCart.items).to.have.lengthOf(6);
            })
            .then(done);
        });

        it('has a reference to the right cartItem', function (done) {
            return ShoppingCart.findOne({})
            .populate('items', 'items.item')
            .then(function(oneCart) {
                console.log("this is cart", oneCart.items.item.name)
                expect(oneCart.items.item.name).to.be("Fake Product");
            })
            .then(done)
        });

        // it('errors without size', function (done) {
        //     product.validate(function (err) {
        //         expect(err.errors.size).to.be.an('object');
        //         done();
        //     });
        // });

        // it('errors without description', function (done) {
        //     product.validate(function (err) {
        //         expect(err.errors.description).to.be.an('object');
        //         done();
        //     });
        // });

        // it('errors without ingredients', function (done) {
        //     product.validate(function (err) {
        //         expect(err.errors.ingredients).to.be.an('object');
        //         done();
        //     });
        // });

        // it('errors without price', function (done) {
        //     product.validate(function (err) {
        //         expect(err.errors.price).to.be.an('object');
        //         done();
        //     });
        // });

        // it('errors without stockAmount', function (done) {
        //     product.validate(function (err) {
        //         expect(err.errors.stockAmount).to.be.an('object');
        //         done();
        //     });
        // });

    });
});
