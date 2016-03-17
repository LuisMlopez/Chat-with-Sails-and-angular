/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

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
				passport.authenticate('local', function(err, user, info) {
			    if (err) { return res.negotiate(err); }
					if (!user) { return res.redirect('/login'); }

					req.logIn(user, function (err) {
						if (err) { return res.negotiate(err); }

						User.update({username: user.username}, {online: true}, function () {
							return res.json({user: req.user});	
						});
						
					});
				})(req, res);
				
			});
	},
	deleteUser: function (req, res) {
		var param = {username : req.param('username')};
		User.destroy(param)
			.exec(function (err) {
				if (err) { return res.negotiate(err); }
				res.json({res : 'deleted'});
			});
	},
	
	///////////////////////////////////////////////////////////////////////
	// test : function (req, res) {
	// 	User.findOne({
	// 		username: 'LuisM'
	// 	}).exec(function (err, user) {
	// 		User.subscribe(req, user.id, 'message');
	// 		res.ok({user:user});
	// 	});
	// },

	// msgTest : function (req, res) {
	// 	User.findOne({
	// 		username: 'LuisM'
	// 	}).exec(function (err, user) {
	// 		User.message(user.id, {message:'Funcionaa!!'});
	// 		res.ok({user:user});
	// 	});
	// }


	
	
};

