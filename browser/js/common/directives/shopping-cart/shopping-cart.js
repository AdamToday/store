app.config(function ($stateProvider) {
  $stateProvider.state('shopping-cart', {
    url: '/cart:userId',
    templateUrl: '/js/common/directives/shopping-cart/shopping-cart.html',
    controller: 'CartCtrl',
    resolve: {
      theUser: function(AuthService) {
        return AuthService.getLoggedInUser();
      },
      currentCart: function(UserFactory, theUser) {
        return UserFactory.fetchCart(theUser._id);
      }
    }
  });
});

app.controller('CartCtrl', function($scope, theUser, currentCart, UserFactory) {
    $scope.user = theUser;
    $scope.cart = currentCart;
    console.log('subtotal', $scope.cart.subtotal)
    $scope.deleteItem = function(product) {
        UserFactory.deleteFromCart($scope.user._id, product._id)
        .then(function(updatedCart) {
            $scope.cart = updatedCart;
        })
    };
});