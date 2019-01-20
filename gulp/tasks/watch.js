'use strict';

let path = $.path.src;

let returnFunc = (cb) => {
  $.gulp.watch(path.pug, $.gulp.series('pug'));
  $.gulp.watch(path.pages, $.gulp.series('html'));
  $.gulp.watch(path.fonts, $.gulp.series('fonts'));
  $.gulp.watch(path.scriptsVendors, $.gulp.series('scripts.vendors'));
  $.gulp.watch(path.scripts, $.gulp.series('scripts'));
  $.gulp.watch(path.images, $.gulp.series('images'));
  $.gulp.watch(path.videos, $.gulp.series('videos'));
  $.gulp.watch(path.documents, $.gulp.series('documents'));
  $.gulp.watch(path.stylesVendors, $.gulp.series('styles.vendors', 'styles'));
  $.gulp.watch(path.stylesFonts, $.gulp.series('styles.vendors', 'styles'));
  $.gulp.watch(path.styles, $.gulp.series('styles'));
  cb();
};

module.exports = ['watch', returnFunc];