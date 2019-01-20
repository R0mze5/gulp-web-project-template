'use strict';

let path = $.path;

// разрешаем только папки, указанные внутри {} в исходниках путей
// let resolvedFolders = path.src.scriptsVendors.match(/{.*}/)[0].replace('{', '').replace('}', '').split(',');

// const resolvePath = require('../functions/pathResolve');

let returnFunc = () => {
  return $.gulp
    // .src(path.src.scripts)
    // .pipe(resolvePath(resolvedFolders))
    .src(path.src.scriptsVendors)
    .pipe($.gulp.dest(path.dest.scripts));
};

module.exports = ['scripts.vendors', returnFunc];