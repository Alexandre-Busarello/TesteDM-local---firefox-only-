angular.module('sampleApp').controller('transactionCtrl', ['$scope', '$routeParams', 'apiService', function ($scope, $routeParams, apiService) {
	
	$scope.paymentTypes = [
		{ id: 1, label: "A vista" },
		{ id: 2, label: "3 vezes" },
		{ id: 3, label: "4 vezes" },
		{ id: 4, label: "5 vezes" },
		{ id: 5, label: "6 vezes" }
	];
	
	$scope.invoices = [];
	
	if ($routeParams.id)
	{
		apiService.getCustomer($routeParams.id).then(function(response) {
			$scope.setCustomer(response.data);
			$scope.customer = response.data;
		}, function(err) {
			$scope.setCustomer({codigo: 0});
		});				
		
		apiService.getCustomerPoints().then(function(response) {
			$scope.points = response.data;
			if ($scope.points.total)
				$scope.points.saldo = $scope.points.total - ($scope.points.utilizados - $scope.points.expirados);
		}, function(err) {
			$scope.points = { total: 0, utilizados: 0, expirados: 0 };
		});			
	}
	else
		$scope.setCustomer({codigo: 0});	
	
	$scope.addInvoice = function (invoice) {
		
		if ($scope.invoiceForm.$valid)
		{
			invoice.createDate = new Date();
			$scope.invoices.push(invoice);
			
			$scope.resetInvoice();
		}
		
	};
	
	$scope.resetInvoice = function () {
		$scope.invoice = {};
		$scope.invoiceForm.$setPristine();		

		$( "#store" ).focus();
	};
	
	$scope.saveInvoices = function (invoices) {
		
		// Se fosse uma aplicação real, faria o POST da minhas lista de notas para o BACKEND
		$scope.invoices = [];		
		$scope.resetInvoice();
		
	};
}]);