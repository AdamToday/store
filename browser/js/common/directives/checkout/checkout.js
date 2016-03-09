app.config(function ($stateProvider) {
  $stateProvider.state('checkout', {
    url: '/cart/checkout',
    templateUrl: 'js/common/directives/checkout/checkout.html',
    controller: 'checkoutCtl',
    resolve: {
        theUser: function(AuthService) { return AuthService.getLoggedInUser(); }
    }
  });
});

app.controller('checkoutCtl', function($scope, theUser, UserFactory){
    var user = theUser;

    var updateinfo = {firstname:"",
    lastname:"",
    contactInfo:{}
    };

   
    $scope.updateuserinfo = function(){

        updateinfo.firstname = $scope.firstname;
        updateinfo.lastname = $scope.lastname;
        updateinfo.contactInfo.phone = $scope.phone;
        updateinfo.contactInfo.address1 = $scope.address1;
        updateinfo.contactInfo.address2 = $scope.address2;
        updateinfo.contactInfo.city = $scope.city;
        updateinfo.contactInfo.state = $scope.state;
        updateinfo.contactInfo.zip = $scope.zip;
        updateinfo.contactInfo.country = $scope.country;
        
        return UserFactory.updateInfo(user._id, updateinfo)
        .then(function(updateinfo){
            return updateinfo;
        });
    }
});