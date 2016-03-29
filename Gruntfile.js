module.exports = function(grunt) {
  require('google-closure-compiler').grunt(grunt);

  var files = {
    './app/assets/javascripts/index.js': ['./app/js_src/index.jsx']
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
    'closure-compiler': {
      frontend: {
        js: './app/assets/javascripts/index.js',
        jsOutputFile:  './app/assets/javascripts/index.min.js',
        maxBuffer: 500,
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          language_in: 'ECMASCRIPT5_STRICT'
        }
      }
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
