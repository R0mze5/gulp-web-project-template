'use strict';

let args = {};

process.argv.forEach(el => {
  if (el.indexOf('=') != -1) {
    let value = el.split('=');

    args[value[0].replace(/--/, '')] = value[1];
  }
});

module.exports = () => {

  if (!args.project) {
    $.path.projectPath = './';

    if (args.folder) {
      let warn = 'you scecify folder path with projects, but don\'t specify project name, that\'s projects path will contains in gulp folder';

      $.msg(warn, 'warn');
    }
    $.path.folder = false;
    $.path.project = false;

  } else if (args.project) {
    $.path.folder = args.folder ? args.folder :'projects'; 
    $.path.project = args.project;

    $.path.projectPath = '../' + $.path.folder + '/' + $.path.project + '/';
  }

  if (args.env) {
    $.env = args.env;
  }
  
};