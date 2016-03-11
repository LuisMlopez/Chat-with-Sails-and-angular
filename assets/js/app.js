$('button#loginButton').on('click', function (event) {
	url = '/login';
	$(location).attr('href', url);
});

$('button#signinButton').on('click', function (event) {
	$('section#chooseSection').hide();
	$('section#signinSection').show();
});

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

$('form#userForm').on('submit', function (event) {
	event.preventDefault();
	$.ajax('/user/createUser', {
		method : 'POST',
		data : {
			name : $('input#name').val(),
			username : $('input#username').val(),
			password : $('input#password').val()

		}
	})
		.done(function (user) {
			$('#userForm').hide();
			$('section#chatSection').show();

		})
		.fail(function (err) {
			console.log(err);
		});
});