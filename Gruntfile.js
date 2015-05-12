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
        storeCoverage: {
            options: {
                dir: 'test/coverage/reports'
            }
        },
        makeReport: {
            src: 'test/coverage/reports/**/*.json',
            options: {
                type: 'lcov',
                dir: 'test/coverage/reports',
                print: 'detail'
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
        grunt.log.writeln(" * compile : Run JSHint and unit test to ensure sanity.");
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-env');

    // Default task(s).
    grunt.registerTask('default', ['help']);
    grunt.registerTask('help', ['project_banner_task', 'help_task']);

    grunt.registerTask('test', ['mochaTest']);

    grunt.registerTask('compile', ['jshint', 'test']);
    grunt.registerTask('coverage', ['env:coverage', 'instrument', 'test', 'storeCoverage', 'makeReport']);
};