'use strict';

const path = $.path;

let returnFunc;

if ($.env.indexOf('dev') != -1) {

  returnFunc = () => {
    return $.gulp
      .src(path.src.images)
      .pipe($.gulp.dest(path.dest.images));
  };

} else {
  const debug = require('gulp-debug');
  const imagemin = require('gulp-imagemin');
  const imageminGifsicle = require('imagemin-gifsicle');
  const imageminJpegRecompress = require('imagemin-jpeg-recompress');
  const imageminPngquant = require('imagemin-pngquant');
  const imageminSvgo = require('imagemin-svgo');

  returnFunc = () => {
    return $.gulp
      .src(path.src.images)
      .pipe(debug({ title: 'building img:', showFiles: true }))
      .pipe($.gulp.dest(path.dest.images))
      .pipe($.plumber())
      .pipe(imagemin([
        imageminGifsicle({ interlaced: true }),
        imageminJpegRecompress({
          progressive: true,
          max: 80,
          min: 70
        }),
        imageminPngquant({ quality: '80' }),
        imageminSvgo({ plugins: [{ removeViewBox: false }] })
      ]))
      .pipe($.gulp.dest(path.dest.images));
  };
}

module.exports = ['images', returnFunc];