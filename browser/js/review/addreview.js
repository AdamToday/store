'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('product.newreview', {
        url: '/addReview',
        templateUrl: 'js/review/addreview.html',
        controller: 'addReviewCrl'
    });
});

app.factory('addReviewFactory', function($http){
    return {
        addNewReview: function(newreview){
            return $http.post('/api/reviews', newreview)
            .then(function(review){
                return review;
            });
        }
    }
});

app.controller('addReviewCrl', function($scope, addReviewFactory, $state){
  $scope.rate = 0;
  $scope.max = 5;
  $scope.isReadonly = false;
  $scope.ratingStates = [
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-heart-empty'}
  ];

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.getrate= function(value) {
    $scope.rate = value;
  };

    $scope.addreview = function(){
        var newreview = { author: $scope.user._id,
        product: $scope.product._id,
        title: $scope.title,
        comments: $scope.comments,
        rating: $scope.rate
        };

        return addReviewFactory.addNewReview(newreview)
        .then(function(){
            $state.go('product');
        })
        .then(null, function(err){
            console.log(err);
        });
    }

});