app.config(function ($stateProvider) {
  $stateProvider.state('checkout', {
    url: '/cart/checkout',
    templateUrl: 'js/common/directives/checkout/checkout.html'
    // controller: 'checkoutCtl',
    // resolve: {
    //   theUser: function(AuthService) {
    //     return AuthService.getLoggedInUser();
    //   },
    //   currentCart: function(UserFactory, theUser) {
    //     return UserFactory.fetchCart(theUser._id);
    //   }
    // }
  });
});