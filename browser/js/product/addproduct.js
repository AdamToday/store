// *****  ADD PRODUCT  *****

app.config(function ($stateProvider) {
    $stateProvider.state('addproduct', {
        url: '/product/addproduct',
        templateUrl: 'js/product/addproduct.html',
        controller: 'AddProductCtrl'
    });
});

app.controller('AddProductCtrl', function($scope, ProductFactory) {
   	$scope.newproduct = {};
   	$scope.types = ["Drinking", "Bar", "Assorted"];
   	$scope.sendNewProduct = function(newProduct){
   		ProductFactory.createNewProduct(newProduct).then(function(product){
   			//set $scope.newProductId to product._id

   			//add $state.go (inject $state) and redirect to new product page with newProductId
   			console.log("new product added: ", product);
   		});

       };
 });   	
