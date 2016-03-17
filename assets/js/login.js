$(document).ready(function () {

	$('button#loginSubmit').on('click', function (event) {
		event.preventDefault();
		
		$.post('/loginP', $( "#loginForm" ).serialize(), function(res) {
			var user = res.user;
			window.currentUser = user;
			//publish user login
			io.socket.get('/publishLogin', function (res, jwres) {
				//console.log('user ' + res.user.username + ' login');
				if(!user) {url = '/login';}
				else {url = '/chatView';}
				$(location).attr('href', url);
			});	
			// if(!res.user) {url = '/login';}
			// else {url = '/chatView';}			
			// $(location).attr('href', url);
		});
	});
});
