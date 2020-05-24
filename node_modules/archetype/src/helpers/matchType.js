'use strict';

/**
 * Given a mapping from types ('object', 'string', 'boolean', 'undefined',
 * 'number', 'symbol', or 'function') to functions, returns a function that
 * takes a `value` and replaces it with the return value from the function
 * mapped to by `typeof value`.
 *
 * Example: `matchType({ 'string': JSON.parse })` will return a function that
 * takes a value and only calls `JSON.parse()` if that value is a string.
 *
 * @param {Object} obj Maps from `typeof` value to function
 * @return {Function} transforms value based on `typeof`
 */

module.exports = function(obj) {
  return function(v) {
    const type = typeof v;
    if (typeof obj[type] === 'function') {
      return obj[type](v);
    }
    return v;
  };
};
