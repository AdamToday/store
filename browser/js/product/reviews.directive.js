'use strict';

app.directive('reviewsPerProduct',function(ProductFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/product/reviews.html',
		controller: 'reviewsCtrl',
		scope: {
			product: '='	
		},
		link: function(scope){
			angular.extend(scope, ProductFactory);
			ProductFactory.fetchAllReviewsByProductId(scope.product._id)
			.then(function (allReviews) {
				scope.reviews = allReviews;
			});
		}
	};

});