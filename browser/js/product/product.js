// *****  SINGLE PRODUCT  *****

app.config(function ($stateProvider) {
    $stateProvider.state('product', {
        url: '/product/:productId/:userId',
        templateUrl: 'js/product/product.html',
        controller: 'ProductCtrl',
        resolve: { 
        	oneProduct: function(ProductFactory, $stateParams){
        		return ProductFactory.fetchById($stateParams.productId);
        	}
            // theUser : function($stateParams) {
            //     return AuthService.getLoggedInUser();
            // }
            // theCart: function($stateParams, UserFactory) {
            //     console.log('stateParams id', $stateParams.userId)
            //     return UserFactory.fetchCart($stateParams.userId);
            // },
            // theUser: function($stateParams, UserFactory) {
            //     console.log('stateParams id', $stateParams.userId)
            //     return UserFactory.fetchCart($stateParams.userId);
            // }
    	}
    });
});

app.controller('ProductCtrl', function($scope, oneProduct, UserFactory, $state, $localStorage, $stateParams) {
    // $scope.userId = theCart.user;
    $scope.product = oneProduct;
    $scope.newCartItem = 1;
    $scope.userId = $stateParams.userId;
    $scope.loggedIn = false;
    UserFactory.fetchById($scope.userId)
    .then (function(user) {
       if (user.userType == 'registered') {
        $scope.loggedIn = true;
       }
    })
    $scope.addToCart = function(qty) {
        // if (!userId) {
        //     if (!$localStorage.cart) $localStorage.cart = [];
        //     $localStorage.cart.push({
        //         item: oneProduct._id,
        //         quantity: qty,
        //         priceAtOrder: oneProduct.price
        //     });
        //     console.log($localStorage.cart);
        // } else {
            return UserFactory.fetchCart($stateParams.userId)
            .then(function(userCart) {
                return $scope.userId = userCart.user;
            })
            .then(function() {
                var newItem = {item: $scope.product, quantity: qty}
                return UserFactory.addToCart($scope.userId, newItem)   
            })
            .then(function() {
                $scope.added = "Item added to cart!";
            })
        // }
    };

    $scope.addReview = function () {
        if ($scope.loggedIn) {
            $state.go('product.newreview');
        }
        else $scope.error = "You must be logged in to do that!";
    };
    $scope.removeError = function () {
        $scope.error = null;
    };
    $scope.removeAdded = function () {
        $scope.added = null;
    };
});