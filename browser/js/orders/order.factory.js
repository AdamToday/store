'use strict';

app.factory('OrderFactory', function($http) {
	var OrderFactory = {};

	UserFactory.fetchAll = function(id) {
		return $http.get('/api/orders')
		.then(response => response.data);
	}
	UserFactory.fetchById = function(id) {
		return $http.get('/api/orders/' + id)
		.then(response => response.data);
	}

	return OrderFactory;
})