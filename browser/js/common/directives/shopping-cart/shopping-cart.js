app.config(function ($stateProvider) {
  $stateProvider.state('shopping-cart', {
    url: '/cart',
    templateUrl: '/js/common/directives/shopping-cart/shopping-cart.html'
    // controller: 'OrdersCtrl',
    // resolve: {
    //   allOrders: function(OrderFactory) {
    //     return OrderFactory.fetchAll();
    //   }
    // }
  });
});