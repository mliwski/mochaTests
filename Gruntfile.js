module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');

    // Project configuration.
    grunt.initConfig({
        env: {
            coverage: {
                APP_DIR_FOR_CODE_COVERAGE: '../test/coverage/instrument/src/'
            }
        },
        jshint: {
            options: {
                /* Enforcing options */
                bitwise: true,
                curly: true,
                eqeqeq: true,
                futurehostile: true,
                latedef: 'nofunc',
                undef: true,
                unused: true,
                /* Relaxing options */
                eqnull: true,
                /* Environments options */
                mocha: true,
                node: true,
                globals: {
                    module: true,
                    console: true,
                    inject: true
                }
            },
            config: ['Gruntfile.js'],
            src: ['src/**/*.js'],
            test: ['test/**/*.js']
        },
        instrument: {
            files: 'src/**/*.js',
            options: {
                lazy: true,
                basePath: 'test/coverage/instrument/'
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec',
                quiet: false
            },
            src: ['test/**/*.js']
        },
        mocha_istanbul: {
            coverage: {
                src: 'src', // a folder works nicely
                options: {
                    mask: '*.js',
                    reporter: 'progress',
                    dryRun: false,
                    reportFormats:['html']
                }
            }
        },
		watch: {
			js: {
				files: [
					'src/**/*.js',
					'test/**/*.js',
					'Gruntfile.js'
				],
				tasks: ['dev'],
				options: { nospawn: true }
			}
		},
		develop: {
			server: {
				file: 'src/app.js'
			}
		}
    });

    grunt.registerTask('project_banner_task', 'Print project banner', function() {
        grunt.log.writeln("");
        grunt.log.writeln(" ########################");
        grunt.log.writeln(" #	" + pkg.name + " V" + pkg.version + "	#");
        grunt.log.writeln(" ########################");
    });

    grunt.registerTask('help_task', 'print help options', function() {
        grunt.log.writeln(" Grunt commands:");
        grunt.log.writeln(" * help : Print this options");
        grunt.log.writeln(" * compile : Run JSHint, unit test and coverage to ensure sanity.");
        grunt.log.writeln(" * test : Run code tests.");
        grunt.log.writeln(" * dev : Run the server in dev mode (watch files, if changed run coverage and restart server).");
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-mocha-istanbul');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-develop');

    // Default task(s).
    grunt.registerTask('default', ['help']);
    grunt.registerTask('help', ['project_banner_task', 'help_task']);

    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('coverage', ['mocha_istanbul:coverage']);

    grunt.registerTask('compile', ['jshint', 'test', 'coverage']);
	
	grunt.registerTask('dev', ['project_banner_task', 'jshint', 'coverage','develop', 'watch']);
};