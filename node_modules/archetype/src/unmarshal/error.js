'use strict';

const StandardError = require('standard-error');

class CastError extends Error {
  constructor() {
    super();
    this.errors = {};
    this.hasError = false;
    this._isArchetypeError = true;
  }

  markError(path, error) {
    const standardized = new StandardError(error.message);
    standardized.stack = error.stack;
    this.errors[path] = standardized;
    this.hasError = true;
    this.message = this.toString();
    return this;
  }

  merge(error) {
    if (!error) {
      return this;
    }
    for (const key of Object.keys(error.errors || {})) {
      this.errors[key] = error.errors[key];
    }
    this.hasError = Object.keys(this.errors).length > 0;
    this.message = this.toString();
    return this;
  }

  toString() {
    let str = [];
    for (const key of Object.keys(this.errors)) {
      str.push(`${key}: ${this.errors[key].message || value}`);
    }
    return str.join(', ');
  }
}

module.exports = CastError;
