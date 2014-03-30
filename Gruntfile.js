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
            test: ['test/report', 'test/dist'],
            all: ['dist', 'test/report', 'test/dist', 'test/bower_components', 'node_modules'],
        },

        uglify: {
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true
                },

                files: {
                    'test/lib/chrome.sockets.tcp.xhr.js': ['src/*.js'],
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

            gruntfile: ['Gruntfile.js'],
            dist: ['src/*.js'],
        },

        qunit: {
            dev: {
                options: {
                    urls: ['test/index.html'],
                    coverage: {
                        src: ['test/lib/*.js'],
                        instrumentedFiles: 'tmp/',
                        htmlReport: 'test/report/coverage',
                        lcovReport: 'test/report/lcov',
                        linesThresholdPct: 0
                    }
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'test'
                }
            }
        },

        coveralls: {
            all: {
                src: 'test/report/lcov/lcov.info'
            }
        },

        watch: {
            options: {
                spawn: false,
                livereload: true,
            },

            test: {
                files: ['test/index.html', 'test/test.js'],
            },

            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:gruntfile']
            },

            js: {
                files: ['src/*.js'],
                tasks: ['jshint:dist', 'uglify:dev']
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
        'clean:dist',
        'uglify:dev',
        'jshint',
        'qunit'
    ]);

    grunt.registerTask('default', [
        'test',
        'connect',
        'watch'
    ]);

    grunt.registerTask('release', [
        'test',
        'clean:dist',
        'uglify:dist'
    ]);
};
