/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Product = Promise.promisifyAll(mongoose.model('Product'));
var Review = Promise.promisifyAll(mongoose.model('Review'));

var seedUsers = function () {

    var users = [
        {
            email: 'elizabeth@chocolate.com',
            password: 'password1',
            isAdmin: true
        },
        {
            email: 'zhengshi@chocolate.com',
            password: 'password2',
            isAdmin: true
        },
                {
            email: 'yuval@chocolate.com',
            password: 'password3',
            isAdmin: true
        },
        {
            email: 'emily@chocolate.com',
            password: 'password4',
            isAdmin: true
        }
    ];

    return User.createAsync(users);

};

var seedProducts = function () {

    var products = [
        {
            name: "85% Dark Venezuelan Chocolate", 
            type: "Bar", 
            size: 3.5, 
            description: "Rich, luxurious and complicated. This single origin bar exudes confidence and notes of sophistication.", 
            ingredients: "organic cocoa liqueur, organic cocoa butter and pure, organic cane sugar", 
            price: 8.00,
            picture: "bar.jpg",
            stockAmount: 30
        },
        {
            name: "80% Dark Ivory Coast Chocolate", 
            type: "Bar", 
            size: 3.5,
            description: "Rich, luxurious and complicated. This single origin bar exudes confidence and notes of sophistication.", 
            ingredients: "organic cocoa liqueur, organic cocoa butter and pure, organic cane sugar", 
            price: 8.00,
            picture: "bar.jpg",
            stockAmount: 37
        },
        {
            name: "75% Javanese Chocolate", 
            type: "Bar", 
            size: 3.5,
            description: "Rich, luxurious and complicated. This single origin bar exudes confidence and notes of sophistication.", 
            ingredients: "organic cocoa liqueur, organic cocoa butter and pure, organic cane sugar", 
            price: 8.00, 
            picture: "bar.jpg",
            stockAmount: 25
        },
        {
            name: "Coco-Nutty", 
            type: "Bar", 
            size: 3.5,
            description: "Our signature bar, this is a warm and comforting vegan milk-chocolate treat made with organic coconut milk and roasted hazelnuts.", 
            ingredients: "organic cocoa liqueur, organic cocoa butter and pure, organic cane sugar, organic coconut milk, hazelnuts", 
            price: 8.00, 
            picture: "bar.jpg",
            stockAmount: 37
        },
        {
            name: "Jumbo Coco-Nutty", 
            type: "Bar", 
            size: 7,
            description: "Our signature bar in a more indulgent size, this is a warm and comforting vegan milk-chocolate treat made with organic coconut milk and roasted hazelnuts.", 
            ingredients: "organic cocoa liqueur, organic cocoa butter and pure, organic cane sugar, organic coconut milk, hazelnuts", 
            price: 12.00,
            picture: "bar.jpg",
            stockAmount: 20
        },
        {
            name: "House Blend Drinking Chocolate", 
            type: "Drinking", 
            size: 12,
            description: "A blend of chocolates to make a cozy cup of cocoa.", 
            ingredients: "organic cocoa liqueur, organic cocoa butter and pure, organic cane sugar", 
            price: 12.00,
            picture: "drinking.jpg",
            stockAmount: 20
        },
        {
            name: "House Blend Drinking Chocolate, Mini", 
            type: "Drinking", 
            size: 4,
            description: "A blend of chocolates to make a cozy cup of cocoa, in a smaller size.", 
            ingredients: "organic cocoa liqueur, organic cocoa butter and pure, organic cane sugar", 
            price: 6.00, 
            picture: "drinking.jpg",
            stockAmount: 20
        },
        {
            name: "The Modest Collection", 
            type: "Assorted", 
            size: 6,
            description: "A smaller collection of our signature truffles.", 
            ingredients: "organic cocoa liqueur, organic cocoa butter and pure, organic cane sugar", 
            price: 6.00, 
            picture: "assorted.jpg",
            stockAmount: 20
        },
        {
            name: "The Just-Right Collection", 
            type: "Assorted", 
            size: 12,
            description: "A collection of our signature truffles in a just-right size.", 
            ingredients: "organic cocoa liqueur, organic cocoa butter and pure, organic cane sugar", 
            price: 15.00, 
            picture: "assorted.jpg",
            stockAmount: 20
        },
        {
            name: "The Romantic Collection", 
            type: "Assorted", 
            size: 18,
            description: "An indulgent collection of our signature truffles in a heart-shaped box and comes in a gift basket with candles and a Barry White's Greatest Hits CD.", 
            ingredients: "organic cocoa liqueur, organic cocoa butter and pure, organic cane sugar", 
            price: 65.00, 
            picture: "assorted.jpg",
            stockAmount: 20
        }
    ];

    return Product.createAsync(products);

};

var seedReviews = function () {

    var reviews = [
        {
            author: "56db0114240eabe555760b48",
            product: "56db0114240eabe555760b4b",
            title: "I love dark chocolate",
            comments: "Delicious chocolates that come in widely unique flavors.",
            rating: 4
        },
        {
            author: "56db0114240eabe555760b48",
            product: "56db0114240eabe555760b4d",
            title: "I love Chocolate Bar",
            comments: "I love the chocolates here because they use dark chocolate and the products aren't too sweet! ",
            rating: 5
        },
            {
            author: "56db0114240eabe555760b47",
            product: "56db0114240eabe555760b4d",
            title: "You are the best",
            comments: "Hey guys!  You are the best in your business. ",
            rating: 5
        },
      
    ];

    return Review.createAsync(reviews);

};

// connectToDb.then(function () {
//     Review.findAsync({}).then(function (reviews) {
//         if (reviews.length === 0) {
//             return seedReviews();
//         } else {
//             console.log(chalk.magenta('Seems to already be review data, exiting!'));
//             process.kill(0);
//         }
//     }).then(function () {
//         console.log(chalk.green('Review seed successful!'))
//         process.kill(0);
//     }).catch(function (err) {
//         console.error(err);
//         process.kill(1);
//     });
// });

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('User seed successful!'))
        return seedProducts();
    }).then(function () {
        console.log(chalk.green('Product seed successful!'))
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});

