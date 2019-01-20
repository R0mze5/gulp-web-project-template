'use strict';

module.exports = function(obj) {
  const fs = require('fs');
  
  const fileName = $.path.packagejson;
  let file = $.path.packagejsonFile;

  Object.keys(obj).forEach(key => {
    let value = obj[key];

    if (Array.isArray(value) || (typeof value === 'string')) {
      file[key] = value;
    } else {
      if (!file[key]) {
        file[key] = {};
      }
      Object.keys(value).forEach(elem => {
        file[key][elem] = value[elem]
      });
    } 
  });

  fs.writeFile(fileName, JSON.stringify(file, null, 2), (err) => {
    if (err) {
      $.msg(err + ': error writing to ' + fileName);
    }
  });

}