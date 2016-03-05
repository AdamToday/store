app.config(function($stateProvider) {
	$stateProvider.state('user', {
		url: '/users/:userId',
		templateUrl: js/user/userPage.html,
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