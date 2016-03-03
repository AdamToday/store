##Routes

### User
* *login route (GET)*
* signup route (POST)
* update user info? (PUT)
* *get one user*

### Order
* make a new order (POST)
* update order (PUT)
* checkout (PUT; change order status to complete)
* get order for one user
* get current order (status "inProgress")
* get all orders for one user

### Products
* *get all products*
* update product (PUT)
* *get one product*
* *get all products in one category*
* in one category: get by size
* get by name (search?)
* get by flavor
* get by price

### Reviews
* *get reviews for one item*
* *get reviews for one author*
* *post a review*

*** security and using req.query to get all?

user: 56d74c48ed58503507a53052
product: 56d74c49ed58503507a5305c


{"author": "56d74c48ed58503507a53052", "product": "56d74c49ed58503507a53058", "title": "The best.", "comments":"Chocolate = life.", "rating": 5 }