'use strict';

// определяет в какую папку будет складывать ресурсы - в корневую или dev
let rootFolder;

let env = $.env;

if (env.indexOf('dev') != -1) {
  rootFolder = 'dev/';
} else if (env.indexOf('prod') != -1) {
  rootFolder = '';
}

module.exports = (projectPath, sourcePath) => {
  
  // полный путь до конечной папки
  let destPath = projectPath + rootFolder + sourcePath;

  $.path.rootFolder = rootFolder;
  $.path.destPath = destPath;
  
  // папка для сохранения веб страниц
  let pagesFolder = projectPath + rootFolder;

  if (env == 'prod' || env == 'prod:clean') {
    pagesFolder += 'pages/';
  }

  // папку видео для продакшена используем из корня
  let videosFolder = `${destPath}videos/`;
  
  if (env.indexOf('prod') != -1) {
    videosFolder = `${projectPath}videos/`;
  }

  return {
    pages: `${pagesFolder}`,
    fonts: `${destPath}fonts/`, 
    scripts: `${destPath}js/`,
    images: `${destPath}images/`,
    videos: `${videosFolder}`,
    documents: `${destPath}documents/`,
    styles: `${destPath}css/`,
  };

  // console.log()
  
};