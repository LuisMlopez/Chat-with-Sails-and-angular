/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



	searchUser : function (req, res) {
		var username = req.params.username;
		User.findOne({
			username : username
		}).exec(function (err, user){
			if (err){
				return res.negotiate(err);
			}
			if (user === undefined){
				res.json({exits: false});
			}else{
				res.json({exits: true});
			}
		});
	},

	newUser: function (req, res) {
		var params = {
			name : req.param('name'),
			username : req.param('username'),
			password : req.param('password')
		};
		
		User.create(params)
			.exec(function (err, user) {
				if (err) { return res.negotiate(err); }
				//login user
				req.login(user, function (err) {
					if (err) { return res.negotiate(err); }
					return res.json({user: req.user});
				});
			});
	},
	deleteUser: function (req, res) {
		var param = {username : req.param('username')};
		User.destroy(param)
			.exec(function (err) {
				if (err) { return res.negotiate(err); }
				res.json({res : 'deleted'});
			});
	}


	
	
};

