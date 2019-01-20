'use strict';

var Stream = require('stream');

function returnStream() {

  var stream = new Stream.Transform({ objectMode: true });

  stream._transform = function (originalFile, unused, callback) {

    callback(null, originalFile.clone({ contents: false }));
  };

  return stream;
}

module.exports = returnStream;