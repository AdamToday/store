'use strict';

app.factory('ProductFactory', function ($http) {

  var ProductFactory = {};

  ProductFactory.fetchAll = function () {
    return $http.get('/api/products')
    .then(response => response.data);
  };

  ProductFactory.fetchById = function (id) {
    return $http.get('/api/products/' + id)
    .then(response => response.data);
  };

  ProductFactory.fetchAllReviewsByProductId = function(id) {
    return $http.get('/api/products/' + id + '/reviews')
    .then(function(response) {
        return response.data;
    });
  };

  ProductFactory.createNewProduct = function(newProductObj) {
    return $http.post('api/products/addproduct', newProductObj)
    .then(response => response.data);
  };

  return ProductFactory;

});