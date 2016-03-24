(function () {
	angular.module('chatApp.services')

	.factory ('SessionService', ['$http', '$q', '$window', function ($http, $q, $window) {
		
		function setCurrentUser (currentUser) {
			$window.sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
		}

		function getCurrentUser () {
			var currentUser = $window.sessionStorage.getItem('currentUser');
			return (currentUser) ? JSON.parse(currentUser) : currentUser;
		}

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
						io.socket.get('/publishLogout', function () {
							defer.resolve();
						});
					});
			}else{
				defer.reject();
			}

			return defer.promise;
		}

		function findUser(username) {
			var defer = $q.defer();
			$http.get('/user/find/' + username)
				.success( function (res) {
					defer.resolve(res);
				})
				.error( function (err) {
					defer.reject(err);
				});
			return defer.promise;
		}

		return {
			setCurrentUser : setCurrentUser,
			getCurrentUser : getCurrentUser,
			login: login,
			signup: signup,
			logout: logout,
			findUser: findUser
		}
	}]);
})();