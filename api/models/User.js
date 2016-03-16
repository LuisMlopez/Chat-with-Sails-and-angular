/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  autosubscribe: ['destroy', 'update', 'create'],
  attributes: {
  	username : {
  		type : 'string',
  		unique : true,
  		required : true
  	},
  	name : {
  		type : 'string'
  	},
  	password : {
  		type : 'string',
      required: true
  	},
    chats: {
      collection: 'chat',
      via: 'owners',
      dominant: true 
    },
    toJson : function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  //encript password with bcrypt module
  beforeCreate : function (user, callback) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
          callback(err);
        }else {
          console.log('Pass encripted');
          user.password = hash;
          callback(null, user);
        }
      });
    });
  }
};

