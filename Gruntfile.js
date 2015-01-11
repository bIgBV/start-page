// Gruntfile.js

// wrapper functions
// all configs go here
module.exports = function (grunt) {
	// ======================================================
	// GRUNT CONFIG
	// ======================================================
	grunt.initConfig({
		// getting config info from package.json
		pkg: grunt.file.readJSON('package.json'),

		// all of our configs go here
		jshint: {
			options: {
				// using jshint-stylish to make errors look soo very good
				reporter: require('jshint-stylish') 
			},

			// once this task is run, lint the Gruntfile and all js files in src
			build: ['Gruntfile.js', 'src/js/*.js']
		},

		// configure uglify to minify js
		uglify: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n' 
			},

			build: {
				files: {
					'dist/js/lib.min.js': ['src/_lib/jquery/dist/jquery.js'], 
					'dist/js/time-weather.min.js': 'src/js/time-weather.js'
				}
			}
		},

		// compyle less to css
		less: {
			build: {
				files: {
					'dist/css/style.css': 'src/css/style.less'
				}
			}
		},

		copy: {
			main: {
				src: ['src/index.html'],
				dest: 'dist/',
				expand: true,
				flatten: true
			},
		},

		// configure autowatch
		watch: {
			// only for stylesheets
			stylesheets : {
				files: ['src/**/*.less'],
				tasks: ['less']
			},

			// only for JS
			scripts: {
				files: 'src/js/*.js',
				tasks: ['jshint', 'uglify']
			},

			// Copying index.html over to the dist folder
			html: {
				files: 'src/index.html',
				tasks: ['copy']
			}
		}

	});

	// Loading Grunt plugins
	// can be loaded only when package.json present
	// make sure npm install is run so that our app can find them
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Create grunt default task
	grunt.registerTask('default', ['jshint', 'uglify', 'less', 'copy']);

};