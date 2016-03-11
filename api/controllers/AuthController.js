/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {
	login: function (req, res, next) {
		//********el usuario autenticado lo va a guardar siempre passport en req.user****
  	debugger;
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
   		if (!user) { return res.redirect('/login'); }

      req.logIn(user, function (err) {
        if (err) { return next(err); }
        return res.json({user: user});
      });
    })(req, res, next);
  },
  logout: function (req,res){
    req.logout();
    res.redirect('/login');
  }	
};

