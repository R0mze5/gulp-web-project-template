'use strict';

// обновляем список скриптов и зависимостей
let suffix = '';

if ($.path.project) {
  let upCount = $.path.folder.split('/').length + $.path.folder.split('/').length;
  let upPath = '';

  for (let i = 0; i < upCount; i++) {
    upPath += '../';
  }
  let cwd = `--cwd=${upPath}gulp`;
  let path = $.path.folder == 'projects' ? '' : `--folder=${$.path.folder}`;
  let project = `--project=${$.path.project}`;

  suffix = ` ${cwd} ${path} ${project}`;
}

let config = require('../packageinit.json');
let packagejsonAppend = require('../functions/packagejsonAppend');

// добавляем суффиксы для всех гульповских скриптов и переносим их в обычные скрипты
Object.keys(config.gulpScripts).forEach(script => {
  config.scripts[script] = config.gulpScripts[script] += suffix;
});

Object.keys(config).forEach(elem => {
  if (elem !== 'gulpScripts') {
    let obj = {};

    obj[elem] = config[elem];
    packagejsonAppend(obj);

  }
});

// выбираем функцию для экспорта, которая будет копировать файлы
let exportArr;

if ($.env === 'init') {
  exportArr = ['./initFiles/*', './initFiles/.*'];
} else if ($.env === 'refresh') {
  exportArr = ['./initFiles/*', './initFiles/.*', '!./initFiles/assets', '!./initFiles/src', '!./initFiles/videos', '!./initFiles/.projectconfig.json', '!./initFiles/humans.txt', '!./initFiles/robots.txt', '!./initFiles/robots_disallow_disabled.txt'];
}

let returnFunc = () => {
  return $.gulp
    .src(exportArr)
    .pipe($.gulp.dest($.path.projectPath));
};

module.exports = ['init', returnFunc];