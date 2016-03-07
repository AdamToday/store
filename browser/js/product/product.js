// *****  SINGLE PRODUCT  *****

app.config(function ($stateProvider) {
    $stateProvider.state('product', {
        url: '/product/:productId',
        templateUrl: 'js/product/product.html',
        controller: 'ProductCtrl',
        resolve: { 
        	oneProduct: function(ProductFactory, $stateParams){
        		return ProductFactory.fetchById($stateParams.productId);
        	},
            theUser : function(AuthService) {
                return AuthService.getLoggedInUser();
            }
    	}
    });
});

app.controller('ProductCtrl', function($scope, theUser, oneProduct, UserFactory, $state) {
    $scope.user = theUser;
    $scope.product = oneProduct;
    $scope.newCartItem = 1;
    $scope.addToCart = function(userId) {
        var newItem = {item: $scope.product, quantity: $scope.newCartItem}
        UserFactory.addToCart(userId, newItem);
    };
    $scope.addReview = function () {
        if ($scope.user) {
            $state.go('product.newreview');
        }
        else $scope.error = "You must be logged in to do that!";
    };
    $scope.removeError = function () {
        $scope.error = null;
    };
});