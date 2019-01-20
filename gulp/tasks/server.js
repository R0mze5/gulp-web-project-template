'use strict';

const browserSync = require('browser-sync').create('Gulp server');

let serverPath = $.path.dest.pages;

let returnFunc = (cb) => {
  
  browserSync.init({
    open: true,
    server: $.path.dest.pages
  });

  browserSync.watch(serverPath, browserSync.reload);
  cb();
};

module.exports = ['server', returnFunc];