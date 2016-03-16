$(document).ready(function () {

	io.socket.get('/user', updateUserList);

	$('button#private-msg-button').on('click', function (ev) {
		var select = $('#users-list');
		if (select.val() === null) {
		  return alert('Please select a user to send a private message to.');
		}

		// Get the recipient's name from the text of the option in the <select>
		var recieverName = $('option:selected', select).text();
		var receiverId = select.val();

		createConversationRoom({ id: receiverId, name: recieverName });
	});

	var template = '<div id=":roomName:">'+
							'<h2>Conversation with <span id=":user-receiver-id:">:receiver-name:</span></h2>' + 
							'<div id=":messages-receiver-id:" style="width: 90%; height: 210px; overflow: auto; border: solid 1px #666; padding: 5px; margin: 5px"></div>'+
							'<input id=":message-receiver-id:"/>' + 
							'<button id=":button-receiver-id:">Send message</button">' + 
							'</div>';


	function createConversationRoom (receiver) {
		var roomName = 'room-' + receiver.id;

		// If HTML for the room already exists, return.
	  if ($('#'+roomName).length) {
	    return;
	  }
	  var resTemplate = template
	  		.replace(':roomName:', roomName)
	  		.replace(':receiver-name:', receiver.name)
	  		.replace(':user-receiver-id:', 'user-' + receiver.id)
	  		.replace(':messages-receiver-id:', 'messages-' + receiver.id)
	  		.replace(':message-receiver-id:', 'message-' + receiver.id)
	  		.replace(':button-receiver-id:', 'button-' + receiver.id);

	  $('div#chat-body').html(resTemplate);
	  $('button#button-' + receiver.id).on('click', buttonSendOnClick);
	}

	function buttonSendOnClick (event) {
		var button = this;
		var receiverId = button.id.split('-')[1];
		var input = $('input#message-'+receiverId);
		var message = input.val();
		input.val('');
		var senderId = window.currentUser.id;

		writeMessage(senderId, receiverId, message);

		io.socket.post('/sendMessage', {
			to: receiverId,
			message: message,
			currentUsername: window.currentUser.username
		}, 
		function (res, jwres) {
			console.log('Message sended to ' + res.to);
		});

	}

	function writeMessage (senderId, receiverId, message) {

		var iAmSender = (senderId == window.currentUser.id),
			  roomName = 'messages-' + (iAmSender ? receiverId : senderId),
			  senderName = iAmSender ? 'Me' : $('span#user-'+senderId).html(),
			  justify = iAmSender ? 'right' : 'left';

		var div = $('<div style="text-align:'+justify+'"></div>');
	  div.html('<strong>'+senderName+'</strong>: ' + message);
	  $('div#'+roomName).append(div);
	}

	function receivePrivateMessage (data) {
		var sender = data.from;
		createConversationRoom(sender);
		writeMessage(sender.id, window.currentUser.id, data.message);
	}

	io.socket.on('user', function reciveMessage (event) {
		switch (event.verb) {
			case 'messaged' : 
				console.log('msg--> '+event.data.message);
				receivePrivateMessage(event.data);
				break;
			case 'created' : 
				console.log('crd--> '+event);
				break;
		}
	});

	/////////////////////////////////

	$('button#subs').on('click', function(event) {
		io.socket.get('/subscribeToUser', {
				username: window.currentUser.username
			},
			function(res, jwres) {
				console.log('user ' + res.user.username + ' subscribed');
		});
	});

	// Test message
	// $('button#snd').on('click', function(event) {
	// 	io.socket.get('/msgTest', function(res) {
	// 		console.log(res);
	// 	});
	// });


});

