'use strict';

const streamfilter = require('streamfilter');

function filterPath(filteredFolders) {
  return streamfilter((file, enc, cb) => {
    cb(filteredFolders.some(filterPath => (file.path.indexOf('\\' + filterPath + '\\') != -1)));
  }, {
    objectMode: true,
  });
}

module.exports = filterPath;