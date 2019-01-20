'use strict';

const path = require('path');

function renameFile(file, ext, filteredFolders) {

  if ((file.basename == 'index' || file.basename == '404') && file.dirname == '.') {} else {
    if (typeof filteredFolders != 'undefined' && filteredFolders.some(filterPath => (file.dirname.indexOf(filterPath) != -1))) {
      // header с footer в корень шаблона, остальное по пути файлов
      if (file.dirname.indexOf('base_areas') != -1) {
        file.dirname = $.path.sourcePath;
      } else {
        file.dirname = path.join($.path.sourcePath, file.dirname);
      }
    } else {
      file.dirname = path.join(file.dirname, file.basename);
      file.basename = 'index';
    }
  }

  file.extname = '.' + ext;
}

module.exports = renameFile;