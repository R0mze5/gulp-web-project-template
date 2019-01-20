'use strict';

let path = $.path;

let returnFunc;

if ($.env.indexOf('dev') != -1) {

  returnFunc = () => {
    return $.gulp
      .src(path.src.pages)
      .pipe($.gulp.dest(path.dest.pages));
  };

} else if ($.env.indexOf('prod') != -1) {

  const renameFile = require('../functions/pugRenameFile');
  let extension = $.config.distExtension;
  
  returnFunc = () => {
    return $.gulp
      .src(path.src.pages)
      .pipe($.rename(function(file) {
        renameFile(file, extension);
      }))
      .pipe($.gulp.dest(path.dest.pages));
  };

}

module.exports = ['html', returnFunc];