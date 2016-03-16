/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {
	login: function (req, res) {
		var socketId = sails.sockets.getId(req);
    var session = req.session;
    session.users = session.users || {};
    
    passport.authenticate('local', function(err, user, info) {
	    if (err) { return res.negotiate(err); }
			if (!user) { return res.redirect('/login'); }//res.redirect('/login'); }
			
	    req.logIn(user, function (err) {
				if (err) { return res.negotiate(err); }
				// debugger;
				
		    session.users[socketId] = user;

				return res.json({user: req.user});//res.redirect('/chatView');
	    });
		})(req, res);
  },
  logout: function (req,res){
    req.logout();
    res.redirect('/login');
  }	
};

