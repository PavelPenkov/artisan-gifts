module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify', { presets: ['es2015', 'react'] }]
          ]
        },
        files: {
          './app/assets/javascripts/index.js': ['./app/js_src/index.jsx']
        }
      }
    },
    watch: {
      scripts: {
        files: ['./app/js_src/*.js', './app/js_src/*.jsx'],
        tasks: ['browserify']
      }
    },
    connect: {
      server: {
        options: {
          port: 8888
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect:server', 'watch']);
  grunt.registerTask('build', ['browserify', 'uglify']);
};
