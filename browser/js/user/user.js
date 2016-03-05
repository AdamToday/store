app.config(function ($stateProvider) {
	$stateProvider.state('users', {
		url: '/users',
		templateUrl: 'js/user/users.html',
		controller: 'UsersCtrl',
		resolve: {
			allUsers: function(UserFactory) {
				return UserFactory.fetchAll();
			}
		}
	});
});

app.controller('UsersCtrl', function($scope, allUsers) {
	$scope.users = allUsers;
});

app.config(function($stateProvider) {
	$stateProvider.state('user', {
		url: '/users/:userId',
		templateUrl: 'js/user/userPage.html',
		controller: 'UserCtrl',
		resolve: {
			theUser: function(UserFactory, $stateParams) {
				return UserFactory.fetchById($stateParams.userId);
			}
		}
	});
});

app.controller('UserCtrl', function($scope, theUser) {
	$scope.user = theUser;
});