(function () {
	angular.module('chatApp.controllers')

	.controller('navbarController', ['$rootScope', '$scope', '$window', '$location', 'ChatService', 'SessionService', function ($rootScope, $scope, $window, $location, ChatService, SessionService) {
		$scope.currentUsername = SessionService.getCurrentUser().username || undefined;

		$scope.logout = function () {
			ChatService.logout($scope.currentUser).then(function () {
				$window.sessionStorage.currentUser = null;
				$rootScope.user = null;
				$location.path('/').replace();
			})
		}
	}]);
})();