(function () {
	angular.module('chatApp.controllers')
	
	.controller('signupController', ['$rootScope', '$window', '$location', 'ChatService', 'SessionService', function ($rootScope, $window, $location, ChatService, SessionService) {
		this.user = {};
		this.var = false;
		
		this.signup = function(){
			ChatService.signup(this.user).then(function (user) {
				SessionService.setCurrentUser(user);
				$rootScope.currentUser = user;
				$location.path('/chat').replace();

			});	
		}
		
		
	}]);

})();