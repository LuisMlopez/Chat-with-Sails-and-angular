(function () {
	angular.module('chatApp.controllers', [])

	.controller('chatController', ['$scope', '$sails', 'ChatService', 'SessionService', '$log', function ($scope, $sails, ChatService, SessionService, $log) {

		$scope.users = [];
		$scope.currentUser = SessionService.getCurrentUser();
		$scope.messages = [{id:1, sender:'Cruyff', message:'RIP'}, {id:2, sender:'Camila', message:'Me voy de fiesta!'}];
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
				debugger;
				switch (event.verb) {
					case 'messaged' : 
						$log.info('msg--> '+event.data.message);
						$scope.createRoom(event.data.from.id);
						$scope.addMessage(event.data.from.name, event.data.message);
						break;
				}
			});
			loginEventIoHandler = $sails.on('login', function(data) {
				debugger;
				getUsers();
			});

			logoutEventIoHandler = $sails.on('logout', function(data) {
				debugger;
				getUsers();
			});
		};

		var subscribeUser = function () {
			debugger;
			ChatService.subscribeUser($scope.currentUser.username).then(function (res) {
				$log.info('User: ' + res.user.name + ' has subscribed.');
				bindSocketEvents();
				getUsers();
			});
		};

		var getUsers = function () {
			ChatService.getUsers().then(function (users) {
				debugger;
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
			$scope.messages.push({
				id : (new Date()).getTime(),
				sender: sender,
				message: message
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