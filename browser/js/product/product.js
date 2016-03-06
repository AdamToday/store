// *****  SINGLE PRODUCT  *****

app.config(function ($stateProvider) {
    $stateProvider.state('product', {
        url: '/product/:productId',
        templateUrl: 'js/product/product.html',
        controller: 'ProductCtrl',

        resolve: { 
        	oneProduct: function(ProductFactory, $stateParams){
        		return ProductFactory.fetchById($stateParams.productId);
        	}
    	}
    });
});

app.controller('ProductCtrl', function($scope, oneProduct) {
    $scope.product = oneProduct[0];
    console.log("$scope.product: ", $scope.product);
});