// *****  LIST OF PRODUCTS TO EDIT  *****

app.config(function ($stateProvider) {
	$stateProvider.state('productstoedit', {
		url: '/products/edit',
		templateUrl: 'js/product/productstoedit.html',
		controller: 'ProductsToEditCtrl',
		resolve: {
			allProducts: function(ProductFactory){
        		return ProductFactory.fetchAll();
			}
		}
	});
});

app.controller('ProductsToEditCtrl', function($scope, allProducts) {
	$scope.products = allProducts;
});

//  *****  EDIT SINGLE PRODUCT / FORM  *****