module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt, {
      pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*!\n' +
              ' * chrome.sockets.tcp.xhr v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' * Licensed under <%= pkg.license %> License\n' +
              ' */\n\n',

        clean: {
            dist: ['dist'],
            test: ['test/coverage', 'test/src', 'test/.jasmine'],
        },

        uglify: {
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true
                },

                files: {
                    'test/src/chrome.sockets.tcp.xhr.js': ['src/chrome.sockets.tcp.xhr.js'],
                }
            },

            dist: {
                options: {
                    banner: '<%= banner %>',
                },

                files: {
                    'dist/chrome.sockets.tcp.xhr.min.js': ['src/chrome.sockets.tcp.xhr.js']
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },

            dist: ['src/*.js'],
            test: ['test/main.js', 'test/vendor/chrome.polyfill.js', 'test/specs/*.js'],
            gruntfile: ['Gruntfile.js'],
        },

        copy: {
            jasmine: {
                files: [
                    {expand: true, flatten: true, filter: 'isFile', src: ['node_modules/grunt-contrib-jasmine/vendor/jasmine-*/**'], dest: 'test/.jasmine/'},
                ]
            }
        },

        jasmine: {
            dist: {
                src: 'src/*.js',
                options: {
                    specs: 'test/specs/*.js',
                    vendor: 'test/vendor/*.js',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'test/coverage/coverage.json',
                        report: 'test/coverage',
                        /*
                        thresholds: {
                            lines: 75,
                            statements: 75,
                            branches: 75,
                            functions: 90
                        }
                        */
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
                files: ['test/main.js', 'test/vendor/chrome.polyfill.js', 'test/specs/*.js'],
                tasks: ['jshint:test', 'jasmine']
            },

            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:gruntfile']
            },

            js: {
                files: ['src/*.js'],
                tasks: ['jshint:dist', 'uglify', 'jasmine']
            }
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json', 'bower.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin'
            }
        }
    });

    grunt.registerTask('test', [
        'jshint',
        'clean',
        'uglify',
        'copy',
        'jasmine'
    ]);

    grunt.registerTask('default', [
        'test',
        'connect',
        'watch'
    ]);

    grunt.registerTask('release', [
        'test',
        'bump-only',
        'changelog',
        'bump-commit'
    ]);
};
