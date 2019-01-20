'use strict';

let path = $.path;

let returnFunc = (cb) => {
  return $.gulp
    .src(path.src.fonts)
    .pipe($.gulp.dest(path.dest.fonts));
    cb();
};

module.exports = ['fonts', returnFunc];