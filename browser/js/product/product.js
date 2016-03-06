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

app.controller('ProductCtrl', function($scope, theUser, oneProduct, UserFactory) {
    $scope.user = theUser;
    $scope.product = oneProduct;
    $scope.newCartItem = 1;
    $scope.addToCart = function(userId) {
        var newItem = {item: $scope.product, quantity: $scope.newCartItem}
        UserFactory.addToCart(userId, newItem);
    };
    console.log("$scope.product: ", $scope.product);
});