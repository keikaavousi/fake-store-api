'use strict';

const cloneDeep = require('lodash.clonedeep');
const unmarshal = require('./unmarshal');

class Type {
  constructor(obj, projection, options) {
    options = options || {};
    if (options.clone !== false) {
      obj = cloneDeep(obj);
    }

    Object.assign(this, unmarshal(obj, this.constructor.schema, projection));
  }
}

module.exports = Type;
