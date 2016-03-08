// *****  ALL PRODUCTS  *****

app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products/:userId',
        templateUrl: 'js/product/products.html',
        controller: 'ProductsCtrl',

        resolve: { 
        	allProducts: function(ProductFactory){
        		return ProductFactory.fetchAll();
        	}
    	}
    });
});

app.controller('ProductsCtrl', function($scope, allProducts, $stateParams) {
	$scope.products = allProducts;
    $scope.user = $stateParams.userId
});