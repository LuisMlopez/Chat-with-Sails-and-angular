(function () {
	angular.module('chatApp.controllers')
	
	.controller('signupController', ['$rootScope', '$window', '$location', 'SessionService', function ($rootScope, $window, $location, SessionService) {
		var me = this;
		this.user = {};
		this.usernameAlreadyExists = null;
		this.disabledButton = true;

		this.usernameExists = function(){
			SessionService.findUser(me.user.username).then(function (res) {
				me.usernameAlreadyExists = res.exists;
				me.disabledButton = res.exists;
			});
		}
		
		this.signup = function(){
			SessionService.signup(this.user).then(function (user) {
				SessionService.setCurrentUser(user);
				$rootScope.currentUser = user;
				$location.path('/chat').replace();
			});	
		}
		
	}]);

})();