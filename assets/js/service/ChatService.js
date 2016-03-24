(function () {
	angular.module('chatApp.services', [])

	.factory('ChatService', ['$http', '$q', function($http, $q) {
		
		function getUsers() {			
			var defer = $q.defer();

			io.socket.get('/users', function (users) {
				defer.resolve(users);
			})
			return defer.promise;
		}

		function subscribeUser(username) {
			var defer = $q.defer();
			io.socket.get('/subscribeToUser', {
				username: username
			},
			function(res, jwres) {
				defer.resolve(res);
			});
			return defer.promise;
		}

		function onMessage () {
			var defer = $q.defer();
			io.socket.on('user', function (event) {
				defer.resolve(event);
			});
			return defer.promise;
		}

		function sendMessage (args) {
			var defer = $q.defer();

			io.socket.post('/sendMessage', args, function (res) {
				defer.resolve(res);
			});

			return defer.promise;
		}
		
		return {
			getUsers : getUsers,
			subscribeUser: subscribeUser,
			sendMessage: sendMessage,
			onMessage : onMessage
		}
		
	}]);
})();

