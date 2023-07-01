const { src, dest, watch, parallel, series } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const nunjucksRender = require('gulp-nunjucks-render');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const del = require('del');
//const ttf2woff2 = require('gulp-ttf2woff2');
//const ttf2woff = require('gulp-ttf2woff');
// const gulpStylelint = require('gulp-stylelint');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'docs/'
    }
  });
};

function cleanDist() {
  return del('dist')
};

//function fonts() {
//  src('docs/fonts/*.ttf')
//    .pipe(ttf2woff())
//    .pipe(dest('docs/fonts/'))
//  return src('docs/fonts/*.ttf')
//    .pipe(ttf2woff2())
//    .pipe(dest('docs/fonts/'));
//};

function images() {
  return src('docs/images/**/*')
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
    'docs/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('docs/js'))
    .pipe(browserSync.stream())
};

function nunjucks() {
  return src('docs/*.njk')
    .pipe(nunjucksRender())
    .pipe(dest('docs'))
    .pipe(browserSync.stream())
};

function styles() {
  return src('docs/scss/**/*.scss')
    // .pipe(gulpStylelint({
    //   reporters: [{
    //     formatter: 'string',
    //     console: true
    //   }]
    // }))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('docs/css'))
    .pipe(browserSync.stream())
};

function build() {
  return src([
    'docs/css/*.css',
    'docs/fonts/**/*.woff',
    'docs/fonts/**/*.woff2',
    'docs/js/*.js',
    'docs/*.html'
  ], { base: 'docs' })
    .pipe(dest('dist'))
};

function wathing() {
  watch(['docs/scss/**/*.scss'], styles);
  watch(['docs/**/*.njk', 'docs/html/**/*.html'], nunjucks);
  //watch(['docs/fonts/**/*.ttf'], fonts);
  watch(['docs/**/*.js', '!docs/js/main.min.js'], scripts);
  watch(['docs/*.html']).on('change', browserSync.reload);
};

exports.styles = styles;
exports.nunjucks = nunjucks;
exports.wathing = wathing;
//exports.fonts = fonts;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);
exports.default = parallel(nunjucks, styles, scripts, browsersync, wathing);
