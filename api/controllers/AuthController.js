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
	    if (err) { return res.json({error:erro, user:user}); }
			if (!user) { return res.json({error:'User or password incorrect', user: user}); }//res.redirect('/login'); }
			
	    req.logIn(user, function (err) {

				if (err || !user) { return res.negotiate(err); }
				// debugger;
				
				User.update({username: user.username}, {online: true}, function () {
					//session.users[socketId] = user;
					return res.json({error:null, user: req.user});//res.redirect('/chatView');	
				});
		    
	    });
		})(req, res);
  },
  logout: function (req,res){
  	var username = req.param('username');
  	User.update({username: username}, {online: false}, function () {
  		req.logout();
    	res.ok();	
  	});
    
  }	
};

