'use strict';

let del = require('del');

let env = $.env;
let path = $.path;

let delArr = [];

// делаем без indexOf, так как могут добавиться моменты, когда не нужно удалять папку
if (env == 'dev' || env == 'dev:clean') {
  // выбираем саму папку разработки
  delArr.push(path.projectPath + path.rootFolder);
} else if ($.env.indexOf('prod') != -1) {
  // выбираем папки продакшена, но саму папку разработки не трогаем, а то мало ли что нужное удалим
  
  // фильтруемые папки
  let filteredKeys = ['videos'];

  if (env == 'prod:init') {
    filteredKeys.push('pages');
  }

  Object.keys(path.dest).forEach(key => {
    if (!filteredKeys.includes(key)) {
      delArr.push(path.dest[key]);
    }
  });
} else {
  $.msg('clean task has error, operation canceled', 'error');
}

let returnFunc = () => {
  return del(delArr, { force: true });
};

module.exports = ['clean', returnFunc];