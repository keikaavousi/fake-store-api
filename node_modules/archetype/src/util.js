'use strict';

const getOwnProperty = require('./helpers/getOwnProperty');

exports.shouldSkipPath = function(projection, path) {
  if (projection.$inclusive) {
    return getOwnProperty(projection, path) != null;
  } else {
    const parts = path.split('.');
    let cur = parts[0];
    for (let i = 0; i < parts.length - 1; ++i) {
      if (getOwnProperty(projection, cur) != null) {
        return false;
      }
      cur += '.' + parts[i + 1];
    }
    return projection[path] == null && projection.$hasExclusiveChild[path] == null;
  }
}
