'use strict';

let path = $.path;

const pug = require('gulp-pug');
const renameFile = require('../functions/pugRenameFile');
const filterPath = require('../functions/pathFilter');

let returnFunc;

let filteredFolders = ['base_areas', 'base_components', 'base_includes', 'components', 'contacts', 'import', 'includes', 'elements', 'include_areas', 'metrix', 'sections'];

if ($.env.indexOf('dev') != -1) {

  returnFunc = () => {
    return $.gulp
      .src(path.src.pug)
      .pipe(filterPath(filteredFolders))
      .pipe($.plumber())
      .pipe(pug({
        pretty: true
      }))
      .pipe($.rename(function(file) {
        renameFile(file, 'html', filteredFolders);
      }))
      .pipe($.gulp.dest(path.dest.pages));
  };

} else if ($.env.indexOf('prod') != -1) {

  let extension = $.config.distExtension;
  let isBitrixRequire = $.config.distType === 'bitrix' ? true : false;

  if (isBitrixRequire) {
    const includeRegExp = /include.+\.pug/g;
    const regExpFilter = require('../functions/regExpFilter');
    
    returnFunc = () => {
      return $.gulp
        .src(path.src.pug)
        .pipe($.plumber())
        .pipe($.replace(includeRegExp, regExpFilter))
        .pipe(pug({
          pretty: true
        }))
        .pipe($.rename(function(file) {
          renameFile(file, extension, filteredFolders);
        }))
        .pipe($.gulp.dest(path.dest.pages));
    };

  } else {
    returnFunc = () => {
      return $.gulp
        .src(path.src.pug)
        .pipe($.plumber())
        .pipe(pug({
          pretty: true
        }))
        .pipe($.rename(function(file) {
          renameFile(file, extension);
        }))
        .pipe($.gulp.dest(path.dest.pages));
    };

  }
}

module.exports = ['pug', returnFunc];