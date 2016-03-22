(function () {
	
	angular.module('chatApp.directives', [])

	.directive('loginForm', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/partials/login.html'
		};
	})
	.directive('signupForm', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/partials/signup.html'
		}
	})
	.directive('chatNavbar', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/partials/navbar.html'
		}
	});

})();