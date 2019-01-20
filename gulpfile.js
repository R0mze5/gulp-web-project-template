'use strict';

global.$ = {
  env: undefined, // тип задачи, указанные в --env
  taskFunc: (cb => {
    $.msg('task function doesnt choose. msg get from global config', 'error'); 
    cb(); // обязательный вызов коллбэка
  }), // функция, вызываемая задачей 
  path: {
    projectPath: './', // путь к проекту
    sourcePath: '', // путь до ресурсов проекта
    // destPath: '', // полный путь до конечной папки
    packagejson: undefined, // путь к package.json проекта
    packagejsonFile: undefined // сам package.json проекта
  },
  // config: {
  //   'preprocessor': 'less',
  //   'devHardLink': true,
  //   'sourcePath': '/local/templates/website/',
  //   'distExtension': 'php',
  //   'distType': false,
  //   'ie11Support': false,
  //   'version' : '4'
  // },
  webpackConfig: './webpack.config.js',
  styles: {
    // preprocessor: undefined,
    // ext: undefined,
    // vendorsPathFile: true
  },
  gulp: require('gulp'), // 4-я версия
  msg: require('./gulp/functions/showMessage'), // функция вывода ошибок
  fs: require('fs')
  // browserSync: require('browser-sync').create(),
};

// получаем полный путь до папки с проектом и тип задачи
require('./gulp/init/projectPath.js')();

// проверяем тип задачи (на инициализация или разработку)
if ($.env == 'init' || $.env == 'refresh') {

  $.path.packagejson = './' + $.path.projectPath + 'package.json';
  $.path.packagejsonFile = require($.path.packagejson);

  let [tasksPath, tasksStack] = require('./gulp/init/configTasks');

  setupTasks(tasksPath, tasksStack);
  
} else if ($.env.search(/dev|prod/) != -1) {

  // Загружаем пользовательский конфиг
  try {

    $.config = getProjectConfig();

    if ($.config) {
      // получаем список требуемых модулей и очереднось запуска задач
      let [tasksPath, tasksStack] = require('./gulp/init/config.js')();

      setupTasks(tasksPath, tasksStack);
    } else {
      throw new Error;
    }
    
  } catch (e) {
    $.msg('project configuration file has error or doesn\'t exist. use init function "gulp --env=init --project=YOURPROJECTNAME" if you folder projects in folder "projects" near gulp folder or "gulp --env=init" if in gulp folder', 'error');
  }

} else {
  $.msg(`env '${$.env}' does'n support or exist, task canceled`, 'error');
}

function getProjectConfig() {
  let config;

  if ($.fs.existsSync($.path.projectPath + '.projectconfig.json')) {
    config = require($.path.projectPath + '.projectconfig.json');
  } else if ($.fs.existsSync($.path.projectPath + '.gulpconfig')) {
    require($.path.projectPath + '.gulpconfig');
    config = global.variables;
    config.version = '4';

    $.msg('file .gulpconfig is the old version of file, use .projectconfig.json', 'warn');
  } else if ($.fs.existsSync($.path.projectPath + 'gulpConfig.js')) {
    require($.path.projectPath + 'gulpConfig.js');
    config = global.variables;
    config.version = '4';

    $.msg('file gulpConfig.js is the old version of file, use .projectconfig.json', 'warn');
  }

  return config;
}

function setupTasks(tasksPath, tasksStack) {

  // подключаем каждый требуемый модуль
  tasksPath.forEach((taskPath) => {
    let [taskName, taskFunc] = require(taskPath);

    // создаем требуемую задачу
    $.gulp.task(taskName, taskFunc);
  });

  // получаем последовательность выполнения команд
  $.taskFunc = tasksStack();
}

// сами таски
$.gulp.task('default', $.taskFunc);