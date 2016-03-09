// *****  LIST OF PRODUCTS TO EDIT  *****

app.config(function ($stateProvider) {
	$stateProvider.state('productstoedit', {
		url: '/products/edit',
		templateUrl: 'js/product/productstoedit.html',
		controller: 'ProductsCtrl',
		resolve: {
			allProducts: function(ProductFactory){
        		return ProductFactory.fetchAll();
			}
		}
	});
});


app.controller('ProductsToEditCtrl', function($scope, $stateParams) {
	$scope.products = allProducts;
});

//  *****  EDIT SINGLE PRODUCT / FORM  *****

app.config(function ($stateProvider) {
	$stateProvider.state('editproduct', {
		url: '/products/edit/:id',
		templateUrl: 'js/product/editproduct.html',
		controller: 'ProductToEditCtrl',
		resolve: {
			productToEdit: function(ProductFactory, $stateParams) {
				return ProductFactory.fetchById($stateParams.id);
			}
		}
	});
});

app.controller('ProductToEditCtrl', function($scope, $stateParams, productToEdit, $state, ProductFactory) {
	$scope.editproduct = productToEdit;
	console.log("$scope.editproduct: ", $scope.editproduct);
	$scope.types = ["Drinking", "Bar", "Assorted"];
	$scope.editSingleProduct = function(editproduct) {
		ProductFactory.updateProduct(editproduct)
		.then(function() {
			$state.go('product', {productId: $scope.editproduct._id});
		});
	};
});
