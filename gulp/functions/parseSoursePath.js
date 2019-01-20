'use strict';

/**
 * Функция для jобрезания первого слеша и точки и добавления слеша в конце
 * @param config - объект с настройками
 * @param path - путь до файла конфигурации задачи
 * @returns {String}
 */

module.exports = function(config, path) {
  let sourcePath = config.sourcePath;
  let resultPath;
  
  if (sourcePath == './' || sourcePath == '/' || sourcePath == '') {
    resultPath = '';
  } else if ((/^\.\//).test(sourcePath)) {
    resultPath = checkLastSymbol(sourcePath.slice(2, sourcePath.length));
  } else if ((/^\//).test(sourcePath)) {
    resultPath = checkLastSymbol(sourcePath.slice(1, sourcePath.length));
  }

  function checkLastSymbol(str) {
    if (str[str.length - 1] === '/') {
      return str;
    }
      
    return str + '/';
  }

  // передаем параметр в глобальную область видимости
  path.sourcePath = resultPath;
  
  delete config.sourcePath;

  return resultPath;

};