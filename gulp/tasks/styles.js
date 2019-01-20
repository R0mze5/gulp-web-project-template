'use strict';

const styleConfig = $.styles;
const path = $.path;

const gap = require('gulp-append-prepend').prependFile;
const cssnano = require('gulp-cssnano');

let preprocessor = $.missPipe;

if (styleConfig.preprocessor !== 'css') {
  preprocessor = require(`gulp-${styleConfig.preprocessor}`);
  // const less = require('gulp-less');
  // const sass = require('gulp-sass');
  // const stylus = require('gulp-stylus');
}

let returnFunc;

let vendorsStylesPath = path.dest.styles + 'vendors.css';
let isVendorsPathFile = $.fs.existsSync(path.vendorsPathFile);

if ($.env.indexOf('dev') != -1) {
  let sourcemaps = require('gulp-sourcemaps');
  
  returnFunc = () => {
    return $.gulp
      .src(path.src.styles)
      .pipe(sourcemaps.init())
      .pipe($.plumber())
      .pipe(preprocessor().on('error', $.msg))
      .pipe($.gulpif(/main/, gap(vendorsStylesPath)))
      .pipe(sourcemaps.write())
      .pipe(cssnano({ 
        autoprefixer: {
          browsers: ['last 50 versions', '> 1%'], 
          add: true
        },
        reduceIdents: false,
        zindex: false
      }))
      .pipe($.gulp.dest(path.dest.styles));
  };

} else {
  returnFunc = () => {
    return $.gulp
      .src(path.src.styles)
      .pipe($.plumber())
      .pipe(preprocessor().on('error', $.msg))
      .pipe($.gulpif(/main/, gap(vendorsStylesPath)))
      .pipe(cssnano({ 
        autoprefixer: {
          browsers: ['last 50 versions', '> 1%'], 
          add: true
        },
        reduceIdents: false,
        zindex: false
      }))
      .pipe($.gulp.dest(path.dest.styles));
  };
}

module.exports = ['styles', returnFunc];