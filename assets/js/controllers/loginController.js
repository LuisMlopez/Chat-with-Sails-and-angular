(function () {
	angular.module('chatApp.controllers', [])
	.controller('loginController', ['$rootScope', '$window', '$location', 'ChatService', function ($rootScope, $window, $location, ChatService) {
		this.user = {};

		this.login = function () {
			ChatService.login(this.user).then(function (user){
				$window.sessionStorage.currentUser = user;
				$rootScope.user = user;
				$location.path('/chat').replace();
			});
		}
		
	}]);

})();