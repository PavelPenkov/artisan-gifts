module.exports = function(grunt) {
  var files = {
    './app/assets/javascripts/edit.js': ['./app/js_src/edit.jsx'],
    './app/assets/javascripts/test.js': ['./app/js_src/test.jsx'],
    './app/assets/javascripts/preview.js': ['./app/js_src/preview.jsx']
  };

  var transform =  [
    ['babelify', { presets: ['es2015', 'react'] }]
  ];

  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: transform,
          debug: true,
          watch: true,
          keepAlive: true
        },
        files: files
      },
      release: {
        options: {
          transform: transform
        },
        files: files
      },
    },
    uglify: {
      dist: {
        files: {
          './app/assets/javascripts/index.ugly.js': './app/assets/javascripts/index.js'
        }
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
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['connect:server', 'browserify']);
  grunt.registerTask('release', ['browserify:release', 'closure-compiler']);
  grunt.registerTask('release-uglify', ['browserify:release', 'uglify']);
};
