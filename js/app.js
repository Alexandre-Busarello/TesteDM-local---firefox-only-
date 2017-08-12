angular.module('sampleApp', ['ngAnimate', 'ui.bootstrap', 'ngRoute', 'ng-currency']);

angular.module('sampleApp').config(function($routeProvider, $locationProvider) {
	$routeProvider.
		when('/customers', {controller : "transactionCtrl", templateUrl: 'partials/transactions.html'}).
		when('/customers/:id/transactions', 	{ controller : "transactionCtrl", templateUrl: 'partials/transactions.html'}).
		when('/customers/:id/benefits', 		{ controller : "benefitCtrl", templateUrl: 'partials/benefits.html'}).
		when('/customers/:id/historical', 	{ controller : "historicalCtrl", templateUrl: 'partials/historical.html'}).
		otherwise({redirectTo:'/customers'});
});

angular.module('sampleApp').service("apiService", ['$http', '$q', function(http, q) {
  return {
    getCustomers: function() {
      var deferred = q.defer();
      http.get("http://www.mocky.io/v2/598d010a260000b614ec23dc").then(function(data) {
        deferred.resolve(data);
      }, function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    },
	getCustomer: function(customerId) {
      var deferred = q.defer();
      http.get("http://www.mocky.io/v2/598e6cbb0f00000f0a1c8e40/" + customerId).then(function(data) {
        deferred.resolve(data);
      }, function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    },	
    getCustomerPoints: function(customerId) {
      var deferred = q.defer();
      http.get("http://www.mocky.io/v2/598e36c90f0000140a1c8e1b/" + customerId).then(function(data) {
		deferred.resolve(data);
      }, function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }
  }
}]);

angular.module('sampleApp').directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;


            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });


            ctrl.$parsers.unshift(function (viewValue) {

          elem.priceFormat({
            prefix: '',
            centsSeparator: ',',
            thousandsSeparator: '.'
        });                

                return elem[0].value;
            });
        }
    };
}]);
