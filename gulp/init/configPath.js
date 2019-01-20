'use strict';

module.exports = (path) => {  
  
  // путь до папки с проектом
  let projectPath = path.projectPath;

  // получаем путь к конечной папке с ресурсами
  let sourcePath = require('../functions/parseSoursePath')($.config, path);
  
  // получаем исходные пути src
  path.src = require('./configPathSrc')(projectPath);

  // получаем конечные пути + глобальный конечный путь
  path.dest = require('./configPathDest')(projectPath, sourcePath);
  
  // получаем относительные пути, которые будут вставляться вместо [[img]], [[style]], [[js]]. [[fonts]], [[videos]], 
  path.rel = require('./configPathRel')(path, projectPath);

  // console.log($.path)
  
}