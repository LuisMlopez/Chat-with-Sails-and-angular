$(document).ready(function () {

	$('button#loginSubmit').on('click', function (event) {
		event.preventDefault();
		
		$.post('/loginP', $( "#loginForm" ).serialize(), function(res) {
			window.currentUser = res.user;
			//Subscribe user
			// io.socket.get('/subscribeToUser', {
			// 	username: res.user.username
			// }, function (res, jwres) {
			// 	console.log('user ' + res.user.username + ' subscribed');
			// 	url = '/chatView';
			// 	$(location).attr('href', url);
			// });			
			url = '/chatView';
			$(location).attr('href', url);
		});
	});
});
