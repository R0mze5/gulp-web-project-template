'use strict';

module.exports = () => {

  let path = $.path;
  let config = $.config;

  require('./configStyles')(config); // конфигурирование обработки стилей
  require('./configPages')(config); // конфигурирование расширения страниц для production
  require('./configPath')(path); // конфигурирование путей
  
  return require('./configTasks'); // конфигурирование задач
};