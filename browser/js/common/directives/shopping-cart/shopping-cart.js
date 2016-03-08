app.config(function ($stateProvider) {
  $stateProvider.state('shopping-cart', {
    url: '/cart/:userId',
    templateUrl: '/js/common/directives/shopping-cart/shopping-cart.html',
    controller: 'CartCtrl',
    resolve: {
      // theUser: function($stateParams) {
      //   var user;
      //   if ($stateParams.userId) {

      //   } else {

      //   }
      // },
      currentCart: function(UserFactory, $stateParams) {
        return UserFactory.fetchCart($stateParams.userId);
      }
    }
  });
});

app.controller('CartCtrl', function($scope, currentCart, UserFactory) {
    $scope.userId = currentCart.user;
    $scope.cart = currentCart;
    console.log('subtotal', $scope.cart.subtotal)
    $scope.deleteItem = function(product) {
        UserFactory.deleteFromCart($scope.userId, product._id)
        .then(function(updatedCart) {
            $scope.cart = updatedCart;
        })
    };
});

app.factory('CartFactory', function($http) {
  var CartFactory = {};

  CartFactory.fetchCart = function(userId) {
    if (!userId) console.log("cart factory: no user id!");
    return $http.get('/api/users/' + userId + '/cart')
    .then(response => response.data);
  };

  return CartFactory;
});