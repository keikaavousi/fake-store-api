'use strict';

module.exports = function getOwnProperty(obj, prop) {
  if (obj == null) {
    return null;
  }
  if (typeof obj !== 'object') {
    return null;
  }
  if (!obj.hasOwnProperty(prop)) {
    return null;
  }
  return obj[prop];
};