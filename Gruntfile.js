module.exports = function( grunt ) {
	grunt.initConfig( {
		uglify: {
			build: {
				src: 'src/ExterminateGlobals.js',
				dest: 'build/ExterminateGlobals.min.js'
			}
		}
	} );

	grunt.loadNpmTasks( 'grunt-contrib-uglify' );

	// Default task(s).
	grunt.registerTask( 'default', ['uglify'] );
};