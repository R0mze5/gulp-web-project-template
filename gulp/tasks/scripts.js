'use strict';

const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
// const named = require('vinyl-named');

let webpackConfig = require('../../' + $.webpackConfig);

let path = $.path;

let returnFunc = () => {
  return $.gulp
    .src(path.src.scripts)
    .pipe($.plumber())
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe($.gulp.dest(path.dest.scripts));
};

module.exports = ['scripts', returnFunc];