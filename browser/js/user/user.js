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
			},
			theReviews: function (UserFactory, $stateParams) {
				return UserFactory.fetchUserReviews($stateParams.userId);
			},
			thePastOrders: function (UserFactory, $stateParams) {
				return UserFactory.fetchPastOrders($stateParams.userId);
			}
		}
	});
});

app.controller('UserCtrl', function($scope, theUser, theReviews, thePastOrders) {
	$scope.user = theUser;
	$scope.orders = thePastOrders;
	$scope.reviews = theReviews;

	$scope.getRating = function (num) {
    var arr = [];
    for (var i = 0; i<num; i++) {
      arr.push(i);
    }
    return arr;
  };
});

app.config(function($stateProvider) {
	$stateProvider.state('user.edit', {
		url: '/users/:userId/edit',
		templateUrl: 'js/user/user-edit.html',
		controller: 'UserEditCtrl',
		resolve: {
			theUser: function(UserFactory, $stateParams) {
				return UserFactory.fetchById($stateParams.userId);
			}
		}
	});
});

app.controller('UserEditCtrl', function ($scope, theUser, UserFactory, $state) {
    var updateinfo = {
    	firstName: "",
    	lastName: "",
    	contactInfo: {}
    };

    $scope.updateUserInfo = function(){
        updateinfo.firstName = $scope.firstName;
        updateinfo.lastName = $scope.lastName;
        updateinfo.contactInfo.phone = $scope.phone;
        updateinfo.contactInfo.address1 = $scope.address1;
        updateinfo.contactInfo.address2 = $scope.address2;
        updateinfo.contactInfo.city = $scope.city;
        updateinfo.contactInfo.state = $scope.state;
        updateinfo.contactInfo.zip = $scope.zip;
        updateinfo.contactInfo.country = $scope.country;
        // console.log("$scope: ", $scope);

        return UserFactory.updateInfo(theUser._id, updateinfo)
        .then(function(updateinfo){
            // console.log("updateinfo: ", updateinfo);
            $state.go('user', { userId: theUser._id });
            return updateinfo;
        });
    };
});
