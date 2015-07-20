module.exports = function(grunt) {

  var paths = {
    base: 'app'
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      paths: paths
    },
    'http-server': {
      dev: {
        root: '<%= config.paths.base %>',
        port: 9000,
        host: '0.0.0.0',
        runInBackground: true,
      }
    },
    sass: {
      dist: {
        files: {
          '<%= config.paths.base %>/css/styles.css': '<%= config.paths.base %>/scss/index.scss'
        }
      }
    },
    watch: {
      css: {
        files: ['<%= config.paths.base %>/scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    },
    rsync: {
      dev: {
        options: {
          args: ['--verbose', '--progress', '-rlt', '--compress', '--omit-dir-times'],
          dest: 'dshowers@dev.derrickshowers.com:/var/www/sites/sumpinnew/',
          src: '/Users/dshowers/Development/sumpin-new/<%= config.paths.base %>/',
          ssh: true,
          delete: false
        }
      }
    },
  });

  // load plugins
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-rsync');

  // tasks
  grunt.registerTask('dev', ['http-server','watch']);
  grunt.registerTask('deploy', ['sass', 'rsync:dev']);

};
