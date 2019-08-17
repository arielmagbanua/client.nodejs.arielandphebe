const { gulp, src, dest, series, watch } = require('gulp');
// var sass = require('gulp-sass');
const uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
// var notify = require('gulp-notify');
// var minifycss = require('gulp-minify-css');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
// var browserSync = require('browser-sync');
// var reload = browserSync.reload;
// const sourcemaps = require('gulp-sourcemaps');
// const autoprefixer = require('gulp-autoprefixer');

/* Setup scss path */
let paths = {
	scss: './src/scss/*.scss'
};

const defaultTask = () => {
	// place code for your default task here
	console.log('Derp!!!');
};

const homeTask = () => {
	return src([
		/* Add your JS files here, they will be combined in this order */
		'src/js/main.js',
	]).pipe(uglify())
		.pipe(dest('public/js'));
};

const googleMapTask = () => {
	return src([
		/* Add your JS files here, they will be combined in this order */
		'src/js/google-map.js',
	]).pipe(plumber()) // stop the process if an error is thrown.
		// Transpile the JS code using Babel's preset-env.
		.pipe(babel({
			presets: [
				[
					'@babel/env', { modules: false }
				]
			]
		}))
		.pipe(uglify())
		.pipe(dest('public/js'));
}

const scriptsTask = () => {
	return src([
		/* Add your JS files here, they will be combined in this order */
		'src/js/vendor/jquery.min.js',
		'src/js/vendor/jquery.easing.1.3.js',
		'src/js/vendor/jquery.stellar.min.js',
		'src/js/vendor/jquery.flexslider-min.js',
		'src/js/vendor/bootstrap.min.js',
		'src/js/vendor/jquery.waypoints.min.js',
		'src/js/vendor/jquery.magnific-popup.min.js',
		'src/js/vendor/simplyCountdown.min.js',
	]).pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(dest('public/js'));
};

exports.homeTask = homeTask;
exports.scriptsTask = scriptsTask;
exports.googleMapTask = googleMapTask;
exports.watch = () => {
	watch('src/js/**/*.js', series(scriptsTask, homeTask, googleMapTask));
};
exports.default = series(scriptsTask, homeTask);