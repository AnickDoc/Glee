const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const nunjucksRender = require('gulp-nunjucks-render');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const del = require('del');
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2woff = require('gulp-ttf2woff');
// const gulpStylelint = require('gulp-stylelint');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
};

function cleanDist() {
  return del('dist')
};

function fonts() {
  src('app/fonts/*.ttf')
    .pipe(ttf2woff())
    .pipe(dest('app/fonts/'))
  return src('app/fonts/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts/'));
};

function images() {
  return src('app/images/**/*')
    .pipe(imagemin(
      [
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ]
        })
      ]
    ))
    .pipe(dest('dist/images'))
};

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
};

function nunjucks() {
  return src('app/*.njk')
    .pipe(nunjucksRender())
    .pipe(dest('app'))
    .pipe(browserSync.stream())
};

function styles() {
  return src('app/scss/**/*.scss')
    // .pipe(gulpStylelint({
    //   reporters: [{
    //     formatter: 'string',
    //     console: true
    //   }]
    // }))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
};

function build() {
  return src([
    'app/css/*.css',
    'app/fonts/**/*.woff',
    'app/fonts/**/*.woff2',
    'app/js/*.js',
    'app/*.html'
  ], { base: 'app' })
    .pipe(dest('dist'))
};

function wathing() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/**/*.njk', 'app/html/**/*.html'], nunjucks);
  watch(['app/fonts/**/*.ttf'], fonts);
  watch(['app/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
};

exports.styles = styles;
exports.nunjucks = nunjucks;
exports.wathing = wathing;
exports.fonts = fonts;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);
exports.default = parallel(nunjucks, styles, scripts, fonts, browsersync, wathing);
