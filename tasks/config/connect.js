module.exports = function(grunt) {

  grunt.config.set('connect', {
    server: {
      options: {
        port: 9000,
        base: 'assets/'
      }
      
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
};