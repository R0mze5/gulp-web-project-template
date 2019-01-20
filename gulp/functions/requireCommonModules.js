'use strict';

// подключает в глобальный массив передаваемые модули
module.exports = function (modules) {
  Object.keys(modules).forEach((module) => {
    $[module] = require(modules[module]);
  });
};