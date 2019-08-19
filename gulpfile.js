const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const minifycss = require('gulp-minify-css');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

const homeTask = () => {
	return src([
		/* Add your JS files here, they will be combined in this order */
		'src/js/main.js',
	]).pipe(plumber())
		.pipe(babel({
			presets: [
				[
					'@babel/env', { modules: false }
				]
			]
		}))
		.pipe(concat('main.js'))
		.pipe(uglify())
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

const styleTask = () => {
	return src('src/scss/style.scss')
			.pipe(plumber())
			.pipe(sass({
				errLogToConsole: true,
				// outputStyle: 'compressed',
				// outputStyle: 'compact',
				// outputStyle: 'nested',
				outputStyle: 'expanded',
				precision: 10
			}))
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
			.pipe(minifycss())
			.pipe(sourcemaps.write('.'))
			.pipe(dest('public/css'));
};

const mergedStylesTask = () => {
	return src([
		'src/css/vendor/bootstrap.min.css',
		'src/css/vendor/animate.css',
		'src/css/vendor/magnific-popup.css',
		'src/css/vendor/flexslider.css',
		'src/fonts/icomoon-demo/style.css',
	]).pipe(plumber())
		.pipe(autoprefixer({
		    browsers: ['last 2 versions'],
		    cascade: false
		}))
		.pipe(concat('styles-merged.css'))
		.pipe(minifycss())
		.pipe(sourcemaps.write('.'))
		.pipe(dest('public/css'));
}

exports.homeTask = homeTask;
exports.scriptsTask = scriptsTask;
exports.googleMapTask = googleMapTask;
exports.styleTask = styleTask;
exports.mergedStylesTask = mergedStylesTask;
exports.watch = () => {
	watch('src/js/**/*.js', series(scriptsTask, homeTask, styleTask));
	watch('src/scss/**/*.scss', series(styleTask, mergedStylesTask));
	watch('src/css/**/*.css', series(styleTask, mergedStylesTask));
};
exports.default = series(scriptsTask, homeTask, googleMapTask, mergedStylesTask, styleTask);