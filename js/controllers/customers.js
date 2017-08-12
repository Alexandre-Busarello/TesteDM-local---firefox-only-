angular.module('sampleApp').controller('customerCtrl', ['$scope', '$location', 'apiService', function ($scope, $location, apiService) {
	$scope.setCustomer = function(customer) {
		$scope.disabled = (customer.codigo == 0);
		$scope.customer = customer;
	};

	$scope.selectCustomer = function(id) {
		if (id)
			$scope.getTransactions(id);		
	};
	
	$scope.getTransactions = function(id) {
		if (id)
			$location.path('/customers/' + id + '/transactions');			
	};			
	
	$scope.getBenefits = function(id) {
		if (id)
			$location.path('/customers/' + id + '/benefits');	
	};		

	$scope.getHistorical = function(id) {
		if (id)
			$location.path('/customers/' + id + '/historical');	
	};		

	$scope.getCustomers = function() {
		$location.path('/customers');	
	};			
	
	apiService.getCustomers().then(function(response) {
		$scope.customers = response.data;
	}, function(err) {
        $scope.customers = [];
    });	
	
	$scope.setCustomer({codigo: 0});
}]);
