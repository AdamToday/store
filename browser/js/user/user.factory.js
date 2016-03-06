'use strict';

app.factory('UserFactory', function($http) {
	var UserFactory = {};

	UserFactory.fetchAll = function() {
		return $http.get('/api/users')
		.then(response => response.data);
	}
	UserFactory.fetchById = function(id) {
		return $http.get('/api/users/' + id)
		.then(response => response.data);
	}
	UserFactory.addToCart = function(id, product) {
		return $http.post('api/users/' + id + '/cart/items', product)
		.then(response => response.data);
	}

	return UserFactory;
})