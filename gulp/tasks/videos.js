'use strict';

let path = $.path;

let returnFunc = () => {
  return $.gulp
    .src(path.src.videos)
    .pipe($.gulp.dest(path.dest.videos));
};

module.exports = ['videos', returnFunc];