'use strict';

const to = require('../to');

const noop = x => x;

exports.handleCast = function(obj, key, type, transform) {
  transform = transform == null ? noop : transform;
  obj[key] = to(transform(obj[key]), type);
};

exports.realPathToSchemaPath = function(path) {
  return path.replace(/\.\d+\./g, '.$.').replace(/\.\d+$/, '.$');
};

exports.join = function(path, key, real) {
  if (!real && typeof key === 'number') {
    key = '$';
  }
  if (path) {
    return path + '.' + key;
  }
  return key;
};
