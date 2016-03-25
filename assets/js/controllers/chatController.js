(function () {
	angular.module('chatApp.controllers', [])

	.controller('chatController', ['$scope', '$sails', 'ChatService', 'SessionService', '$log', function ($scope, $sails, ChatService, SessionService, $log) {

		$scope.users = [];
		$scope.currentUser = SessionService.getCurrentUser();
		$scope.messages = [];
		$scope.message = '';
		$scope.currentRoom = '';
		$scope.showInput = false;
		$scope.reciever = {};

		var userEventIoHandler,
			loginEventIoHandler,
			logoutEventIoHandler;

		$scope.$on('$destroy', function() {
	      	$sails.off('user', userEventIoHandler);
	      	$sails.off('login', loginEventIoHandler);
	      	$sails.off('logout', logoutEventIoHandler);
	    });


		var bindSocketEvents = function () {
			userEventIoHandler = $sails.on('user', function (event) {
				switch (event.verb) {
					case 'messaged' : 
						$log.info('msg--> '+event.data.message);

						$scope.initConversation(event.data.from);
						$scope.addMessage(event.data.from, event.data.message);
						break;
				}
			});
			loginEventIoHandler = $sails.on('login', function(data) {
				getUsers();
			});

			logoutEventIoHandler = $sails.on('logout', function(data) {
				getUsers();
			});
		};

		var subscribeUser = function () {
			ChatService.subscribeUser($scope.currentUser.username).then(function (res) {
				$log.info('User: ' + res.user.name + ' has subscribed.');
				bindSocketEvents();
				getUsers();
			});
		};

		var getUsers = function () {
			ChatService.getUsers().then(function (users) {
				$scope.users = users.filter(function (user) {
					return user.online && user.id !== $scope.currentUser.id;
				})
			});
		};

		$scope.initConversation = function (user) {
			$scope.reciever = user;
			$scope.createRoom(user.id);
		}

		$scope.createRoom = function (id) {
			$scope.showInput = true;
			var roomName = 'room-' + id;
			if ($scope.currentRoom !== roomName){
				$scope.currentRoom = roomName;
				$scope.messages = [];
			}
		};

		$scope.test = function ($event) {
			if (event.keyCode === 13){
				$scope.addMessage('me', $scope.message);
				$scope.sendMessage($scope.currentUser.username, $scope.reciever.id, $scope.message);
				$scope.message = '';
			}			
		};

		$scope.addMessage = function (sender, message) {
			var messageAlign = 
				(sender.id === $scope.currentUser.id || sender === 'me' ) ? 'right' : 'left';
			$scope.messages.push({
				id : (new Date()).getTime(),
				sender: sender.name || sender,
				message: message,
				align: messageAlign
			});
		};

		$scope.sendMessage = function (fromU, to, message) {
			var sendObj = {
				currentUsername: fromU,
				to: to,
				message: message
			}
			ChatService.sendMessage(sendObj).then(function (res) {
				//Do something.
			});
		};

		subscribeUser();

	}]);
})();