/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// var User = require('../models/User');

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
				// return res.view('chat.ejs', {user: user});
				res.json({'user' : user}); //../../assets/templates/chat.html);
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

