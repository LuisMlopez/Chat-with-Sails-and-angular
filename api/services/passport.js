var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt');

//helper functions
function findById(id, fn) {
  // debugger;
  User.findOne({
    id : id
  }).exec(function (err, user) {
    if (err) {
      return fn(err, null);
    } else {
      return fn(null, user);
    }
  });
}
 
function findByUsername(u, fn) {
  User.findOne({
    username: u
  }).exec(function (err, user) {
    // Error handling
    if (err) {
      return fn(err, null);
      // The User was found successfully!
    } else {
      return fn(null, user);
    }
  });
}
 
// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser(function (user, done) {
  // debugger;
  done(null, user.username);
});
 
passport.deserializeUser(function (username, done) {
  // debugger;
  findByUsername(username, function (err, user) {
    done(err, user);
  });
});

// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object.
passport.use(new LocalStrategy(
  function (username, password, done) {
    // debugger;
    // asynchronous verification, for effect...
    // process.nextTick(function () {//nextTick: asynchronous


      // Find the user by username. If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message. Otherwise, return the
      // authenticated `user`.
    findByUsername(username, function (err, user) {
      if (err) { return done(null, err); }
      if (!user) {
        return done(null, false, { message: 'Unknown user ' + username });
      }
      bcrypt.compare(password, user.password, function (err, res) {

        if (!res)
          return done(null, false, { message: 'Invalid Password' });

        var returnUser = {
          username: user.username,
          createdAt: user.createdAt,
          id: user.id
        };
        return done(null, returnUser, { message: 'Logged In Successfully' });
      });
    });
      
    // });
  }
));