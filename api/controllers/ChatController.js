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
	}

};

