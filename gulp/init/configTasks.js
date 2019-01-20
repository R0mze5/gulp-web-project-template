'use strict';

// список общих модулей, подключаемых к dev и prod 
let commonModules = {
  plumber: 'gulp-plumber',
  rename: 'gulp-rename',
  replace: 'gulp-replace',
  concat: 'gulp-concat',
  gulpif: 'gulp-if',
  missPipe: '../functions/missPipe'
};

let taskPath = [];
let tasksStack = cb => {
  $.msg('called tasks doesn\'t choosed', 'warn'); 
  cb(); // обязательный вызов коллбэка
};

// проверяем задачи по условиям
if ($.env == 'init' || $.env == 'refresh') {
  taskPath = ['./gulp/tasks/init'];

  tasksStack = () => {
    return $.gulp.series(
      'init'
    );
  };

} else if ($.env == 'dev:clean' || $.env == 'prod:clean') {

  taskPath = ['./gulp/tasks/clean'];

  tasksStack = () => {
    return $.gulp.series(
      'clean'
    );
  };

} else if ($.env == 'dev') {

  require('../functions/requireCommonModules')(commonModules);

  taskPath = [
    './gulp/tasks/clean', 
    './gulp/tasks/documents', 
    './gulp/tasks/fonts', 
    './gulp/tasks/html', 
    './gulp/tasks/images', 
    './gulp/tasks/pug', 
    './gulp/tasks/server', 
    './gulp/tasks/scripts',
    './gulp/tasks/scripts.vendors',
    './gulp/tasks/styles', 
    './gulp/tasks/styles.vendors',
    './gulp/tasks/videos',
    './gulp/tasks/watch'
  ];

  tasksStack = () => {
    return $.gulp.series(
      'clean',
      $.gulp.parallel(
        'documents',
        'fonts',
        'images',
        'videos',
        $.gulp.series(
          'html', 
          'pug'
        ),
        $.gulp.series(
          'styles.vendors', 
          'styles'
        ),
        $.gulp.series(
          'scripts.vendors', 
          'scripts'
        )
      ),
      $.gulp.parallel(
        'watch',
        'server'
      )
    );
  };
 
} else if (($.env == 'prod') || ($.env == 'prod:init')) {

  require('../functions/requireCommonModules')(commonModules);

  taskPath = [
    './gulp/tasks/clean', 
    './gulp/tasks/documents', 
    './gulp/tasks/fonts', 
    './gulp/tasks/html', 
    './gulp/tasks/images', 
    './gulp/tasks/pug', 
    './gulp/tasks/scripts',
    './gulp/tasks/scripts.vendors',
    './gulp/tasks/styles', 
    './gulp/tasks/styles.vendors',
  ];

  tasksStack = () => {
    return $.gulp.series(
      'clean',
      $.gulp.parallel(
        'documents',
        'fonts',
        'images',
        $.gulp.series(
          'html', 
          'pug'
        ),
        $.gulp.series(
          'styles.vendors', 
          'styles'
        ),
        $.gulp.series(
          'scripts.vendors', 
          'scripts'
        )
      )
    );
  };
 
} else {
  $.msg(`env '${$.env}'does'n support, task canceled`, 'error');
}

module.exports = [taskPath, tasksStack];

