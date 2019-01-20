'use strict';

let path = $.path;

path.vendorsPathFile = path.dest.styles + 'vendors.css';

// let fontsPath = global.variables.sourcePath == '/' ? projectPath + 'src/fonts/**/*-light.css' : projectPath + 'src/fonts/**/*-bitrix.css';

let returnFunc = () => {
  return $.gulp
    .src([path.src.stylesVendors, path.src.stylesFonts])
    .pipe($.concat('vendors.css'))
    .pipe($.gulp.dest(path.dest.styles));
};

module.exports = ['styles.vendors', returnFunc];