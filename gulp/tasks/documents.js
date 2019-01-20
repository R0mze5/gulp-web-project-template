'use strict';

let path = $.path;

let returnFunc = () => {
  return $.gulp
    .src(path.src.documents)
    .pipe($.gulp.dest(path.dest.documents));
};

module.exports = ['documents', returnFunc];