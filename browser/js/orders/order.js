app.config(function($stateProvider) {
	$stateProvider.state('orders', {
		url: '/orders',
		templateUrl: 'js/user/orders.html',
		controller: 'OrdersCtrl',
		resolve: {
			theUser: function(OrderFactory) {
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
		templateUrl: 'js/user/order.html',
		controller: 'OrderCtrl',
		resolve: {
			theUser: function(OrderFactory, $stateParams) {
				return OrderFactory.fetchById($stateParams.orderId);
			}
		}
	});
});

app.controller('OrderCtrl', function($scope, theOrder) {
	$scope.order = theOrder;
});