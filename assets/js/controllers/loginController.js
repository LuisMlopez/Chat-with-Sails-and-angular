(function () {
	angular.module('chatApp.controllers', [])
	.controller('loginController', ['$rootScope', '$window', '$location', 'ChatService', 'SessionService', function ($rootScope, $window, $location, ChatService, SessionService) {
		this.user = {};

		this.login = function () {
			ChatService.login(this.user).then(function (user){
				
				SessionService.setCurrentUser(user);
				$rootScope.currentUser = user;
				$location.path('/chat').replace();
			});
		}
		
	}]);

})();