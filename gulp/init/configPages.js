'use strict';

module.exports = (config) => {

  if (config.distType == 'bitrix') {
    if (config.distExtension !== 'php') {
      $.msg('pages will use *.php extention, because bitrix path of files indicated in config', 'warn');
    }
    config.distExtension = 'php';
  } else {
    config.distType = false;
    if (!(config.distExtension == 'php' || config.distExtension == 'html')) {
      config.distExtension = 'php';
      $.msg('pages will use *.php extention, because extension in config is unsupported', 'warn');
    }
  }
  
};