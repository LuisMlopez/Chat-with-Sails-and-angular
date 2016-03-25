(function () {
	angular.module('chatApp.services', [])

	.factory('ChatService', ['$http', '$q', '$sails', function($http, $q, $sails) {
		
		function getUsers() {			
			var defer = $q.defer();
			$sails.get('/users').then(function (res) {
				defer.resolve(res.body);
			}, function (resp){
		        alert('Houston, we got a problem!');
		    })
			return defer.promise;
		}

		function subscribeUser(username) {
			var defer = $q.defer();
			$sails.get('/subscribeToUser', {
				username: username
			}).then(function (res, jwres) {
				defer.resolve(res.body);
			}, function (resp){
		        alert('Houston, we got a problem!');
		    });
			return defer.promise;
		}

		function sendMessage (args) {
			var defer = $q.defer();

			$sails.post('/sendMessage', args).then(function (res) {
				defer.resolve(res.body);
			}, function (resp){
		        alert('Houston, we got a problem!');
		    });

			return defer.promise;
		}
		
		return {
			getUsers : getUsers,
			subscribeUser: subscribeUser,
			sendMessage: sendMessage
		}
		
	}]);
})();

