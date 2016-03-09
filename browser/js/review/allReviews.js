app.config(function ($stateProvider) {
  $stateProvider.state('reviews', {
    url: '/orders',
    templateUrl: 'js/review/allReviews.html',
    controller: 'ReviewCtrl',
    resolve: {
      allReviews: function(ReviewFactory) {
        return ReviewFactory.fetchAll();
      }
    }
  });
});

app.controller('ReviewCtrl', function($scope, allReviews) {
  $scope.reviews = allReviews;
});

app.factory('ReviewFactory', function($http) {
  var OrderFactory = {};

  ReviewFactory.fetchAll = function() {
    console.log("fetching all reviews...");
    return $http.get('/api/reviews')
    .then(response => response.data);
  }

  ReviewFactory.fetchById = function(id) {
    return $http.get('/api/reviews/' + id)
    .then(response => response.data);
  }

  return ReviewFactory;
})