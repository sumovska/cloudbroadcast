/** Source paths **/
var src = {
	root: 'src/',
	html: 'src/',
	css: 'src/css/',
	scss: 'src/scss/',
	js: 'src/js/',
	vendor: 'bower_components/',
	node: 'node_modules/',
	img: 'src/img/',
	svg: 'src/img/svg/',
	fonts: 'src/fonts/'
};

/** Destination paths **/
var dist = {
	root: 'dist/',
	html: 'dist/',
	css: 'dist/css/',
	js: 'dist/js/',
	img: 'dist/img/',
	fonts: 'dist/fonts/'
};


var config = {
	src: 'src/',
	dest: 'dist/'
};


module.exports = function (grunt) {
	grunt.initConfig({
		config: config,
		clean: {
			pre: [dist.root, src.css, src.js + 'vendor'],
			after: [src.js + 'vendor/fastclick.js', src.css + 'variables.*', src.css + '*.map' ]
		},
		copy: {
			dev: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [
							src.vendor + 'html5shiv/dist/html5shiv.min.js',
							src.vendor + 'jquery/dist/jquery.min.js',
							src.vendor + 'bootstrap/dist/js/bootstrap.min.js'
						],
						dest: src.js + 'vendor'
					},
					{
						expand: true,
						flatten: true,
						src: [
							src.vendor + 'bootstrap/dist/css/bootstrap.min.css'
						],
						dest: src.css
					},
					{
						expand: true,
						flatten: true,
						src: [
							src.vendor + 'bootstrap/dist/fonts/*.*'
						],
						dest: src.fonts
					}
				]
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= config.src %>',
						dest: '<%= config.dest %>',
						src: [
							'css/{,*/}*.*',
							'img/{,*/}*.*',
							'fonts/{,*/}*.*',
							'js/{,*/}*.js',
							'{,*/}*.html'
						]
					}
				]
			}
		},
		concat: {
			options: {
				separator: '\n\n\n'
			},
			dist: {
				files: [
					{
						src: [
							src.js + 'custom.js'
						],
						dest: src.js + 'plugins.js'
					}
				]
			}
		},
		sass: {
			dev: {
				files: [{
					expand: true,
					cwd: src.scss,
					src: ["**/*.scss"],
					dest: src.css,
					ext: ".css"
				}]
			}
		},
		uglify: {
			dist: {
				/*
				files: [{
					expand: true,
					cwd: dist.js,
					src: '*.js',
					dest: 'dist/js',
					ext: ".min.js"
				}]
				*/
			}
		},
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: [src.js + "*.js"],
				tasks: ["process"]
			},
			styles: {
				files: [src.scss + "*.scss"],
				tasks: ["process"]
			},
			html: {
				files: [src.html + "*.html"],
				tasks: ["process"]
			},
			images: {
				files: [src.img + "**/*.*"],
				tasks: ["process"]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-rename");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-newer");

	grunt.registerTask("default", ["clean:pre", "sass", "copy:dev", "concat", "clean:after", "copy:dist", "watch"]);
	grunt.registerTask("process", ["newer:sass", "newer:copy:dist"]);
};