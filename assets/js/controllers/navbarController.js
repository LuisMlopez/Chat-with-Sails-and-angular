(function () {
	angular.module('chatApp.controllers')

	.controller('navbarController', ['$rootScope', '$scope', '$window', '$location', 'SessionService', function ($rootScope, $scope, $window, $location, SessionService) {
		$scope.currentUsername = SessionService.getCurrentUser().name || undefined;

		$scope.logout = function () {
			SessionService.logout($scope.currentUser).then(function () {
				$window.sessionStorage.currentUser = null;
				$rootScope.user = null;
				$location.path('/').replace();
			})
		}
	}]);
})();