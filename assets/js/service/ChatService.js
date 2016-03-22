(function () {
	angular.module('chatApp.services', [])

	.factory('ChatService', ['$http', '$q', function($http, $q) {
		
		function login (user) {
			var defer = $q.defer();

			$http.post('/loginP', user)
				.success(function (res) {
					defer.resolve(res.user);
				}).error(function (err){
					defer.reject(err);
				});
			return defer.promise;
		}

		function signup (user) {
			var defer = $q.defer();

			$http.post('/user/createUser', user)
				.success( function (res) {
					defer.resolve(res.user);
				});

			return defer.promise;
		}

		function logout (username) {
			var defer = $q.defer();
			if (username) {
				$http.post('/logout', username)
					.success( function () {
						defer.resolve();
					});
			}else{
				defer.reject();
			}

			return defer.promise;
		}

		return {
			login: login,
			signup: signup,
			logout: logout
		}
		
	}]);
})();

