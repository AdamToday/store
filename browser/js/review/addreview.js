'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('newreview', {
        url: '/products/addreview',
        templateUrl: 'js/review/addreview.html',
        controller: 'addReviewCrl'
    });
});
app.factory('addReviewFactory', function($http){
    return {
        addNewReview: function(newreview){
            console.log("I am going to post your review",newreview)
            return $http.post('/api/reviews', newreview)
            .then(function(review){
                return review
            });
        }
    }
});
app.controller('addReviewCrl', function($scope,addReviewFactory){
    var userid = "56db0114240eabe555760b48";
    var productId = "56db0114240eabe555760b4c";    
    $scope.addreview = function(){
        var newreview = { author: userid,
        product: productId,
        title: $scope.title,
        comments: $scope.comments,
        rating: $scope.rating
    }
        return addReviewFactory.addNewReview(newreview)
        .then( function(){
                console.log("thanks"); 
            })
        .then(null, function(err){
                console.log(err);
            });
    }

});