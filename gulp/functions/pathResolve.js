'use strict';

const streamfilter = require('streamfilter');

function resolvedPath(resolvedFolders) {
  return streamfilter((file, enc, cb) => {
    cb(
      checkPath(file, resolvedFolders)
    );
  }, {
    objectMode: true,
  });
}

function checkPath(file, resolvedFolders) {
  let result = resolvedFolders.some(resolvePath => (file.path.indexOf('\\' + resolvePath + '\\') != -1));

  return !result;
}

module.exports = resolvedPath;