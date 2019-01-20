'use strict';

const webpack = require('webpack');
const path = require('path');
// const merge = require('webpack-merge');

let modeEnv = 'development';

let PATHS;

let babelOptions = {    
  'presets': [
    [
      '@babel/preset-env'
    ]
  ]
};

if (typeof $ != 'undefined') {
  if ($.env.indexOf('prod') != -1) {
    modeEnv = 'production';
  }
  let gulpPath = $.path;

  if ($.config.ie11Support) {
    babelOptions = {    
      'presets': [
        [
          '@babel/preset-env',
          {
            'useBuiltIns': 'usage',
            'targets': {
              'ie': '11',
              'chrome': '58'
            }
          }
        ]
      ]
    };

  }

  PATHS = {
    source: path.join(__dirname, gulpPath.src.scriptsFolderPath),
    build: path.join(__dirname, gulpPath.dest.scripts),
  };
} else {
  // статичные пути для тестого js файла для прямого тестирования webpack
  PATHS = {
    source: path.join(__dirname, '../projects/test.web/src/scripts'),
    build: path.join(__dirname, '../projects/test.web/dev/local/templates/website/js/'),
  };
}

let returnConfig = {
  // watch: !isProduction,
  mode: modeEnv,
  devtool: modeEnv == 'development' ? 'module-inline-source-map' : '',
  entry: {
    'index': path.join(PATHS.source, 'initial.js'),
  },
  output: {
    path: PATHS.build,
    filename: 'initial.js', // будет заменяться на имя входящего файла
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ]
};

module.exports = returnConfig;
