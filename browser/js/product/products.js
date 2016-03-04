app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/product/products.html',
        controller: 'ProductsCtrl',

        resolve: { 
        	allProducts: function(ProductFactory){
        		return ProductFactory.fetchAll();

        	}
    	}
    });
});

app.controller('ProductsCtrl', function($scope, allProducts) {
	$scope.products = allProducts;
	console.log("$scope.products: ", $scope.products);
});