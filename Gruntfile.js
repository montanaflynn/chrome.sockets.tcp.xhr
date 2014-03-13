module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*!\n' +
              ' * chrome.sockets.tcp.xhr v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' * Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
              ' */\n\n',

        clean: {
            dist: ['dist'],
            all: ['dist', 'node_modules'],
            report: ['test/report']
        },

        uglify: {
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true
                },

                files: {
                    'test/chrome.sockets.tcp.xhr.js': ['src/*.js'],
                }
            },

            dist: {
                options: {
                    banner: '<%= banner %>',
                },

                files: {
                    'dist/chrome.sockets.tcp.xhr.min.js': ['src/*.js']
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },

            dist: ['Gruntfile.js', 'src/*.js'],
        },

        watch: {
            options: {
                spawn: false,
                livereload: true,
            },

            js: {
                files: ['src/*.js'],
                tasks: ['jshint', 'uglify:dev']
            }
        },

        bump: {
            options: {
                part: 'minor',
                onBumped: function(data) {
                    if (data.index === 0) {
                        grunt.config('pkg.version', data.version);
                    }
                }
            },

            files: ['package.json', 'bower.json']
        }
    });

    grunt.registerTask('test', [
        'clean:report',
        'jshint',
    ]);

    grunt.registerTask('default', [
        'test',
        'uglify:dev',
        'watch'
    ]);

    grunt.registerTask('release', [
        'test',
        'clean:dist',
        'uglify:dist'
    ]);
};
