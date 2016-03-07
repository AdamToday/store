app.controller('reviewsCtrl', function($scope) {
  $scope.getRating = function (num) {
    var arr = [];
    for (var i = 0; i<num; i++) {
      arr.push(i);
    }
    return arr;
  };
});