module.exports = {

	getAll : function (next) {
		User.find({}).exec(function (err, users) {
			if (err) throw err;
			var usersRes = users.map(function (user) {
				user.password = '';
				return user;	
			});
			return next(usersRes);
		});
	}

}