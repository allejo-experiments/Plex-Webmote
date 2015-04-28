module.exports = function(grunt) {
    grunt.task.loadNpmTasks("grunt-sass");
    grunt.renameTask("sass", "libsass");

    require('load-grunt-tasks')(grunt, {
        pattern: [ 'grunt-*', '!grunt-sass' ]
    });

    grunt.initConfig({
        'check-gems': {
            dist: {
                files: [{
                    src: '.'
                }]
            }
        },
        libsass: {
            options: {
                style: 'expanded',
                sourceMap: true,
                lineNumbers: true
            },
            debug: {
                files: {
                    'assets/css/styles.css': 'assets/css/styles.scss'
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'assets/css/styles.css': 'assets/css/styles.scss'
                }
            }
        },
        scsslint: {
            allFiles: [
                'assets/css/**/*.scss'
            ],
            options: {
                config: '.scss-lint.yml'
            }
        },
        jshint: {
            options: {
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
                reporter: require('jshint-stylish')
            },
            all: ['Gruntfile.js', 'assets/js/*.js', '!assets/js/jquery.*.js']
        },
        uglify: {
            options: {
                mangle: true
            },
            dist: {
                files: {
                    'assets/js/rasplex-webmote.min.js' :  [ 'assets/js/*.js', '!assets/js/jquery.*.js', '!assets/js/*.min.js' ]
                }
            }
        },
        watch: {
            options: {
                livereload: true,
                spawn: false
            },
            scripts: {
                files: [ 'assets/js/rasplex-webmote.min.js' ],
                tasks: [ 'js' ],
                options: {
                    spawn: true
                }
            },
            css: {
                files: [ 'assets/css/styles.css' ]
            },
            styles: {
                files: [
                    'assets/css/**/*.scss',
                    '!assets/css/vendor/**/*.scss'
                ],
                tasks: [ 'libsass' ],
                options: {
                    livereload: false,
                    spawn: true
                }
            }
        }
    });

    grunt.registerTask('css', [ 'sass:dist' ]);
    grunt.registerTask('js', [ 'jshint', 'uglify' ]);
    grunt.registerTask('check', [ 'check-gems' ]);
    grunt.registerTask('default', [ 'css', 'js' ]);
};