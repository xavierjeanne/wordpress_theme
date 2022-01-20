var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    imageminkeep = require('imagemin-keep-folder'),
    livereload = require('gulp-livereload'),
    jshint = require('gulp-jshint'),
    plumber = require('gulp-plumber'),
    eyeglass = require('eyeglass');

//sass.compiler = require('sass');

var source = 'assets/';
var dest = 'dist/';

var boostrapSassSrc = './node_modules/bootstrap/';

// Fonts, including bootstrap fonts
var fonts = { in: [source + 'fonts/*.*', boostrapSassSrc + 'assets/fonts/**/*'],
    out: dest + 'fonts/'
};


/**
 * Fonts :
 * copy to dist, with Bootstrap fonts too
 *
 */
gulp.task('fonts', function() {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});


/**
 * Style :
 * Sass compilation including bootstrap-sass
 *
 */

autoprefixBrowsers = ['last 2 versions', 'ie >= 11', 'last 3 Edge versions', 'ie_mob >= 11', 'last 3 Chrome versions',
    'last 2 Safari versions', 'last 3 Firefox versions', 'last 3 Opera versions', 'iOS >= 9', 'Android >= 4'
];


gulp.task('sass', gulp.series('fonts', function() {
    return gulp.src(source + '/scss/style.scss')
        .pipe(plumber())
        //.pipe(sass(eyeglass()))
        // .pipe(sass({
        //     sourceComments: 'map',
        //     sourceMap: 'sass',
        //     outputStyle: 'nested'
        // }))
        .pipe(sass({
            sourceComments: true,
            sourceMap: true,
            outputStyle: 'nested'
        }).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: autoprefixBrowsers }))
        //     .pipe(cssmin())
        .pipe(rename('theme.css'))
        .pipe(gulp.dest(dest + 'css'))
        .pipe(livereload());
}));


/**
 * Js lint of main.js
 * stop gulp task on error
 *
 */
gulp.task('lint', function() {
    return gulp.src(source + '/js/main.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

/**
 * Javascript
 *
 */

gulp.task('js', gulp.series('lint', function() {
    // Js librairies used on current theme
    gulp.src(source + '/js/libs/**/*.js')
        .pipe(plumber())
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(dest + 'js/'))
        .pipe(livereload());

    // Theme main js file
    return gulp.src(source + '/js/main.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(dest + 'js/'));
}));


/**
 * Image compression
 *
 */
gulp.task('img', function() {
    // return gulp.src([source + '/img/**/*.{png,jpg,gif}'])
    //     .pipe(imageminkeep())
    //    // .pipe(imagemin())
    //     .pipe(dest + 'images/');

    //   return imageminkeep( [source + '/img/**/*.{png,jpg,gif}'], dest+ '/images', {});
    return imageminkeep(['assets/img/**/*.{jpg,png,gif,svg}'], {
        replaceOutputDir: output => {
            return output.replace(/assets\/img\//, 'dist/images/')
        }
    });
    //  imageminkeep([source + '/img/**/*.{png,jpg,gif}']);
});

/**
 * Watch task
 *
 */
gulp.task('watch', function() {
    //gulp.watch( 'assets/scss/**/*.scss', ['sass'] );
    //gulp.watch( 'assets/js/**/*.js', ['js'] );
    //gulp.watch( 'assets/img//*.{png,jpg,gif}', ['img'] );
    //
    gulp.watch('assets/scss/**/*.scss').on('all', gulp.series('sass'));
    gulp.watch('assets/js/**/*.js').on('all', gulp.series('js'));
    gulp.watch('assets/img/**/*.{png,jpg,gif,svg}').on('all', gulp.series('img'));
    //gulp.watch('assets/img/**/*.{png,jpg,gif}').on('all', gulp.series('img'));
});

/**
 * Default
 * Should be launch at the beginning of every coding session
 *
 */
gulp.task('default', gulp.series(gulp.parallel('sass', 'img', 'js', 'watch'), function() {
    return livereload.listen();
}));