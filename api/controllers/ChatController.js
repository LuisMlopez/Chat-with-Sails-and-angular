/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	send : function (req, res) {
		if (!req.isSocket) return res.json({message: 'Your request must be a socket!'});

		User.findOne({
			username: req.param('currentUsername')
		}).exec (function (err, sender) {
			if (err) return res.negotiate(err);

			var to = req.param('to'),
					message = req.param('message');
		
			User.message(to, {
				from : sender,
				message: message
			});
			return res.json({
				to: to,
				from: sender,
				message: message
			});
		});
	},
	subscribeToUser : function (req, res) {
		if (!req.isSocket) return res.json({message: 'You are not a socket!!'});
		
		var usernameToSubscribe = req.param('username');

		User.findOne({
			username: usernameToSubscribe
		}).exec (function (err, user) {
			if (err) return res.json({err : 'error creating user.'});

			//req: contain the socket wich is subscribing to another socket.
			//user.id : the user id which your are going to subscribe. 
			User.subscribe(req, user.id, 'message');
			//join to the general room
			sails.sockets.join(req, 'general', function (err) {
				if (err) return res.negotiate(err);
			});
			sails.sockets.broadcast('general', 'login', {});
			//sails.sockets.broadcast('general', 'login', {message:'user ' + usernameToSubscribe + 'is online..'});
			res.json({user: user});
			
		});
	},
	publishLogin : function (req, res) {
		if (!req.isSocket) return res.json({message: 'You are not a socket!!'});

		sails.sockets.broadcast('general', 'login', {});
		res.ok();		
	},
	publishLogout : function (req, res) {
		if (!req.isSocket) return res.json({message: 'You are not a socket!!'});

		sails.sockets.broadcast('general', 'logout', {});
		res.ok();		
	}

};

