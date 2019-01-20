'use strict';

module.exports = (config) => {

  switch (config.preprocessor) {
    case 'less': {
      $.styles.preprocessor = 'less';
      $.styles.ext = 'less';
      break;
    }
    case 'sass': {
      $.styles.preprocessor = 'sass';
      $.styles.ext = 'sass';
      break;
    }
    case 'scss': {
      $.styles.preprocessor = 'sass';
      $.styles.ext = 'scss';
      break;
    }
    case 'stylus': {
      $.styles.preprocessor = 'stylus';
      $.styles.ext = 'styl';
      break;
    }
    case 'css': {
      $.styles.preprocessor = 'css';
      $.styles.ext = 'css';
      break;
    }
    default : {
      $.styles.preprocessor = 'css';
      $.styles.ext = 'css';
      $.msg('preprocessor doesnt\'t choosen or has error, use default css folder and *.css files', 'warn');
      break;
    }
  } 
  
  delete config.preprocessor;
};