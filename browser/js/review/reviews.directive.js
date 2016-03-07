'use strict';

app.directive('reviewsPerProduct',function(ProductFactory) {
	return {
		restrict: 'E',
		templateUrl: '/js/product/reviews.html',
		scope: {
			product: '='	
		},
		link: function(scope, product){
			angular.extend(scope, ProductFactory);
			scope.reviews = ProductFactory.fetchAllReviewsByProductId(scope.product._id);
		}
	};

});