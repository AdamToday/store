'use strict';

app.factory('CartFactory', function($http) {
	var CartFactory = {};

	CartFactory.fetchCart = function(userId) {
		return $http.get('/api/users/' + userId + '/cart')
		.then(response => response.data);
	};

	return CartFactory;
});