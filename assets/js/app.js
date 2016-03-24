(function () {
	var chatApp = angular.module('chatApp', [
		'ngRoute',
		//'ngSails',
		'chatApp.controllers',
		'chatApp.directives',
		'chatApp.services'
	]);

	chatApp.config(['$routeProvider', function ($routeProvider) {

		$routeProvider
		.when('/chat', {
			templateUrl : '/templates/chat.html',
			resolve: {
				loginRequired: loginRequired
			}
		})
		.when('/', {
			templateUrl: '/templates/index.html',
			resolve: {
				check: sessionOnProgress
			}
		})
		.otherwise({
			redirectTo : '/',
			caseInsensitiveMatch: true
		});
		
	}]);

	var loginRequired = function ($q, $rootScope, $location) {
		var defer = $q.defer();
		if (!$rootScope.currentUser){
			$location.path('/').replace();
		}
		defer.resolve();
		return defer.promise;
	}

	var sessionOnProgress = function ($q, $rootScope, $location) {
		var defer = $q.defer();
		if ($rootScope.currentUser){
			$location.path('/chat').replace();
		}
		defer.resolve();
		return defer.promise;
	}

	chatApp.run(['$rootScope', 'SessionService', function ($rootScope, SessionService) {
		Object.defineProperty($rootScope, 'currentUser', {
			get : function () {
				return SessionService.getCurrentUser();
			}
		});
	}]);
	
})();
