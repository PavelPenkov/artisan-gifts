module.exports = function(grunt) {
  require('google-closure-compiler').grunt(grunt);

  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify', { presets: ['es2015', 'react'] }]
          ],
          watch: true,
          keepAlive: true
        },
        files: {
          './app/assets/javascripts/index.js': ['./app/js_src/index.jsx']
        }
      },
      release: {
        options: {
          transform: [
            ['babelify', { presets: ['es2015', 'react'] }]
          ]
        },
        files: {
          './app/assets/javascripts/index.js': ['./app/js_src/index.jsx']
        }
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
          './app/assets/javascripts/index.min.js': './app/assets/javascripts/index.js'
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
};
