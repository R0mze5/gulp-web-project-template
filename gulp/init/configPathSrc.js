'use strict';

module.exports = (projectPath) => {

  // config styles source paths
  let preprocessor = $.styles.preprocessor;
  let styleExt = $.styles.ext;

  let scriptsFolder = 'scripts';
  let fontsFileName = 'styles.css';

  if ($.config.version == '4') {
    scriptsFolder = 'es';
    fontsFileName = '*-bitrix.css';
  }

  let scriptVendorsPaths = [
    `${projectPath}src/${scriptsFolder}/{vendors,polyfills,base_components}/**/*.js`,
    `${projectPath}src/${scriptsFolder}/*.js`,
    `!${projectPath}src/${scriptsFolder}/initial.js`,
  ];

  return {
    pug: [`${projectPath}src/pug/**/*.pug`, `!${projectPath}src/pug/**/!template.pug`],
    pages: `${projectPath}src/pages/**/*.html`,
    fonts: `${projectPath}src/fonts/**/*.{eot,svg,ttf,woff,woff2}`,
    scripts: `${projectPath}src/${scriptsFolder}/initial.js`,
    scriptsFolderPath: `${projectPath}src/${scriptsFolder}`,
    scriptsVendors: scriptVendorsPaths,
    images: `${projectPath}src/images/**/*.*`,
    videos: `${projectPath}videos/**/*.*`,
    documents: `${projectPath}src/documents/**/*.*`,
    stylesVendors: `${projectPath}src/${preprocessor}/vendors/**/*.css`,
    stylesFonts: `${projectPath}src/fonts/**/${fontsFileName}`,
    styles: preprocessor == 'css' ? `${projectPath}src/${preprocessor}/**/*.${styleExt}` : `${projectPath}src/${preprocessor}/*.${styleExt}`
  };
  
};