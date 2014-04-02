module.exports = function (grunt) {
    'use strict';

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: {
            components: ['_build'],
        },

        connect: {
            server: {
                options: {
                    port: 4000,
                    base: '_build/html'
                }
            }
        },

        shell: {
            make: {
                options: {
                    stdout: true
                },

                command: 'make html'
            }
        },

        watch: {
            options: {
                spawn: false,
                livereload: true,
            },

            rst: {
                files: ['*.rst'],
                tasks: ['clean', 'shell'],
            }
        }
    });

    grunt.registerTask('default', [
        'clean',
        'shell',
        'connect',
        'watch'
    ]);
};
