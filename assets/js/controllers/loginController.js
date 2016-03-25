(function () {
	angular.module('chatApp.controllers')
	.controller('loginController', ['$rootScope', '$window', '$location', 'SessionService', function ($rootScope, $window, $location, SessionService) {
		this.user = {};

		this.login = function () {
			SessionService.login(this.user).then(function (user){
				
				SessionService.setCurrentUser(user);
				$rootScope.currentUser = user;
				$location.path('/chat').replace();
			});
		}
		
	}]);

})();