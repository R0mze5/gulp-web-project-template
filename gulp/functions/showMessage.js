'use strict';

module.exports = function (e, t) {
  switch (t) {
    case 'warn': {
      console.log(`\x1b[33m${e}\x1b[0m`);
      break;
    }
    case 'error': {
      console.log(`\x1b[41m${e}\x1b[0m`);
      break;
    }
    default: {
      console.log(e);
      break;
    }
  }
}