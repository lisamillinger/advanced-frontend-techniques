const sass = require('node-sass');
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'public/main.css': 'grunt-vorlage-unangetastet/assets/scss/style.scss'
                }
            }
        },
            concat: {
                dist: {
                    src: ['assets/js/cookiehint.js', 'assets/js/responsive-table.js'],
                    dest: 'public/main.js',
                },
            },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    src: ['public/main.css'],
                    dest: 'public/main',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/main.min.js': ['public/main.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['assets/js/*.js'],
                tasks: ['concat', 'uglify']
            },
            styles: {
                files: ['assets/scss/*.scss'],
                tasks: ['sass', 'cssmin']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'assets/scss/*.scss',
                        'assets/js/*.js'
                    ]
                },
                options: {
                    watchtask: true,
                    proxy: "http://localhost/grunt-vorlage-praxis1/grunt-vorlage-unangetastet/public/"
                }
            }
        }
        });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    // Default task(s).
    grunt.registerTask('default', ['sass', 'concat', 'uglify', 'cssmin']);
    grunt.registerTask('serve', ['default','browserSync', 'watch']);
};