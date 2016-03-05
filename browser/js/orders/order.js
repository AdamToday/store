app.config(function ($stateProvider) {
	$stateProvider.state('orders', {
		url: '/orders',
		templateUrl: 'js/orders/orders.html',
		controller: 'OrdersCtrl',
		resolve: {
			allOrders: function(OrderFactory) {
				return OrderFactory.fetchAll();
			}
		}
	});
});

app.controller('OrdersCtrl', function($scope, allOrders) {
	$scope.orders = allOrders;
});

app.config(function($stateProvider) {
	$stateProvider.state('order', {
		url: '/orders/:orderId/',
		templateUrl: 'js/orders/order.html',
		controller: 'OrderCtrl',
		resolve: {
			theOrder: function(OrderFactory, $stateParams) {
				return OrderFactory.fetchById($stateParams.orderId);
			}
		}
	});
});

app.controller('OrderCtrl', function($scope, theOrder) {
	$scope.order = theOrder;
		console.log("$scope.order", $scope.order.items);

});