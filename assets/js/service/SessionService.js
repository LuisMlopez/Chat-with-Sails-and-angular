(function () {
	angular.module('chatApp.services')

	.factory ('SessionService', ['$window', function ($window) {
		
		function setCurrentUser (currentUser) {
			$window.sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
		}

		function getCurrentUser () {
			var currentUser = $window.sessionStorage.getItem('currentUser');
			return (currentUser) ? JSON.parse(currentUser) : currentUser;
		}

		return {
			setCurrentUser : setCurrentUser,
			getCurrentUser : getCurrentUser
		}
	}]);
})();