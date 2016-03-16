$(document).ready(function (){

	io.socket.on('connect', function socketConnected () {
		console.log('connected with sockets!!!----------');

		//Login
		$('button#loginButton').on('click', function (event) {
			url = '/login';
			$(location).attr('href', url);
		});

		//signup
		$('button#signupButton').on('click', function (event) {
			$('section#chooseSection').hide();
			$('section#signinSection').show();
		});

		//logout
		$('button#logoutButton').on('click', function (event) {
			url = '/logout';
			$(location).attr('href', url);
		});

		//verify that the username is no already used
		$('#username').on('focusout', function(ev) {
			var input = this;
			var username = input.value;
			$.ajax('/user/find/' + username)
				.done(function (res) {
					if (!res.exits){
						$(input).removeClass('invalid').addClass('valid');
						//, $this.val().length === 0
						$('.submit').prop('disabled', false);
						input.setCustomValidity('');
					}else{
						$(input).removeClass('valid').addClass('invalid');
						$('.submit').prop('disabled', true);
						input.setCustomValidity('Username already used!');
					}
				})
				.fail(function (err) {
					console.log(err);
				});
		});
		//Create new user
		$('form#userForm').on('submit', function (event) {
			event.preventDefault();
			
			$.post('/user/createUser', $( "#userForm" ).serialize(), function (res) {
				window.currentUser = res.user;
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

});