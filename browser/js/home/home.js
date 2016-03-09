app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});



// app.controller('HomeCtrl', function($scope, theUser) {

//   $scope.user = theUser;

  // $scope.isLoggedIn = function () {
  //     return AuthService.isAuthenticated();
  // };

  // $scope.logout = function () {
  //     AuthService.logout().then(function () {
  //        $state.go('home');
  //     });
  // };

  // var setUser = function () {
  //     AuthService.getLoggedInUser().then(function (user) {
  //         $scope.user = user;
  //           console.log('scope.user', $scope.user)

  //     });
  // };

  // var removeUser = function () {
  //     $scope.user = null;
  // };

  // setUser();

  // $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
  // $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
  // $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);
// });

