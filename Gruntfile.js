'use strict';

module.exports = function( grunt ) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    
    jshint: {
      options: grunt.file.readJSON('.jshintrc'),
      src: [ 'app/**/*.js' ]
    },

    watch: {
      scripts: {
        files: ['app/**/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          base: '',
          open: 'http://127.0.0.1:9000/app/index.html',
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask( 'serve', ['jshint', 'connect', 'watch']);
 
  grunt.registerTask( 'default', [
    'jshint'
  ]);

};
