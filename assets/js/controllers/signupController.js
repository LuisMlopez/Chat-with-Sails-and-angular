(function () {
	angular.module('chatApp.controllers')
	
	.controller('signupController', ['$rootScope', '$window', '$location', 'ChatService', function ($rootScope, $window, $location, ChatService) {
		this.user = {};
		this.var = false;
		
		this.signup = function(){
			ChatService.signup(this.user).then(function (user) {
				$window.sessionStorage.currentUser = user;
				$rootScope.user = user;
				$location.path('/chat').replace();

			});	
		}
		
		
	}]);

})();