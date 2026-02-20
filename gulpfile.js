const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const clean = require('gulp-clean');

function cleanDist() {
    return src('dist', { read: false, allowEmpty: true }).pipe(clean());
}

function styles() {
    return src('src/scss/main.scss')
        .pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
        .pipe(concat('style.min.css'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return src('src/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
}

function copyImages() {
    return src('src/img/**/*', { encoding: false })
        .pipe(dest('dist/img'))
        .pipe(browserSync.stream());
}

function copyHtml() {
    return src('src/*.html')
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

function watching() {
    browserSync.init({
        server: { baseDir: "dist" }
    });
    watch(['src/scss/**/*.scss'], styles);
    watch(['src/js/main.js'], scripts);
    watch(['src/img/**/*'], copyImages);
    watch(['src/*.html'], copyHtml);
}

exports.build = series(cleanDist, parallel(styles, scripts, copyImages, copyHtml));

exports.default = series(cleanDist, parallel(styles, scripts, copyImages, copyHtml), watching);