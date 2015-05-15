module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');

    // Project configuration.
    grunt.initConfig({
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
        }
    });

    grunt.event.on('coverage', function(lcovFileContents, done){
        // Check below on the section "The coverage event"
        done();
    });

    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);
    grunt.registerTask('coverage', ['mocha_istanbul:coverage']);

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

    // Default task(s).
    grunt.registerTask('default', ['help']);
    grunt.registerTask('help', ['project_banner_task', 'help_task']);

    grunt.registerTask('test', ['mochaTest']);

    grunt.registerTask('compile', ['jshint', 'test']);
};