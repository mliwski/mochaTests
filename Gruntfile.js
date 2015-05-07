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
        grunt.log.writeln(" * compile : Run tests and then build dev on tmp folder");
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['help']);
    grunt.registerTask('help', ['project_banner_task', 'help_task']);

    grunt.registerTask('compile', ['jshint']);
};