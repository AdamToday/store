// *****  ADD PRODUCT  *****

app.config(function ($stateProvider) {
    $stateProvider.state('addproduct', {
        url: '/product/addproduct',
        templateUrl: 'js/product/addproduct.html',
        controller: 'AddProductCtrl'
    });
});

app.controller('AddProductCtrl', function($scope, ProductFactory, $state, $stateParams) {
   	$scope.newproduct = {};
    $scope.newproduct.picture = "assorted.jpg";
   	$scope.types = ["Drinking", "Bar", "Assorted"];
   	$scope.sendNewProduct = function(newProduct){
   		ProductFactory.createNewProduct(newProduct).then(function(product){
     			$scope.newProductId = product._id;
          $state.go('product', {productId: $scope.newProductId});
   		 });

    };
 });   	
