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

        it('has the correct number of references', function () {

            return ShoppingCart.findOne({})
            .then(function(oneCart) {
                expect(oneCart.items).to.have.lengthOf(1);
            });
        });

        it('has a reference to the right cartItem', function () {
            return ShoppingCart.findOne({})
            .deepPopulate('item items.item')
            .then(function(oneCart) {
                console.log("this is cart", oneCart.items[0].item.name);
                expect(oneCart.items[0].item.name).to.be.string("Fake Product");
            });
        });

    });
});
