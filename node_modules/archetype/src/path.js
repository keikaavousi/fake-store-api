'use strict';

const util = require('util');

class Path {
  constructor(obj) {
    if (obj != null && obj.$default != null && typeof obj.$default === 'object') {
      const $default = obj.$default;
      const numKeys = Array.isArray($default) ?
        $default.length :
        Object.keys($default).length;
      const isInvalidType = Array.isArray($default) ?
        false :
        [void 0, Object].indexOf($default.constructor) === -1;
      if (numKeys > 0 || isInvalidType) {
        throw new Error('Default is a non-empty object `' +
          util.inspect($default) + '`. Please make `$default` a function ' +
          'that returns an object instead');
      }
    }
    Object.assign(this, obj);
  }
}

module.exports = Path;