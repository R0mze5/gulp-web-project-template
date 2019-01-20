'use strict';

// gulp.task('crearCache', () => {
//   return cache.clearAll();
// })

let returnFunc = (cb) => {
  // return $.gulp
  //   .src(path.src.pages)
  //   .pipe(path.dest.pages);
  cb();
};

module.exports = ['clearCache', returnFunc];