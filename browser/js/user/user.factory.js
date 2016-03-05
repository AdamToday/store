'use strict';

app.factory('UserFactory', function($http) {
	var UserFactory = {};

	UserFactory.fetchById = function(id) {
		return $http.get('/api/users/' + id)
		.then(response => response.data);
	}

	return UserFactory;
})