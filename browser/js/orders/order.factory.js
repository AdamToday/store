'use strict';

app.factory('OrderFactory', function($http) {
	var OrderFactory = {};

	OrderFactory.fetchAll = function() {
		return $http.get('/api/orders')
		.then(response => response.data);
	}
	OrderFactory.fetchById = function(id) {
		console.log("OrderFactory id: ", id);
		return $http.get('/api/orders/' + id)
		.then(response => response.data);
	}

	return OrderFactory;
})