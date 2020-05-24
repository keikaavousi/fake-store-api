'use strict';

const Any = require('./symbols').Any;
const inspect = require('util').inspect;
const isPOJO = require('./helpers/isPOJO');

module.exports = to;

const CAST_PRIMITIVES = {
  number: v => {
    // Nasty edge case: Number converts '', ' ', and `{ toString: () => '' }` to 0
    if (typeof v !== 'number' && v.toString().trim() === '') {
      throw new Error(`Could not cast "${inspect(v)}" to number`);
    }

    if (isPOJO(v)) {
      throw new Error(`Could not cast "${inspect(v)}" to number`);
    }

    const res = Number(v).valueOf();
    if (Number.isNaN(res)) {
      throw new Error(`Could not cast "${inspect(v)}" to number`);
    }
    return res;
  },
  string: v => {
    if (isPOJO(v)) {
      throw new Error(`Could not cast "${inspect(v)}" to string`);
    }
    return String(v);
  },
  boolean: v => {
    const str = String(v);
    if (str === '1' || str === 'true' || str === 'yes') {
      return true;
    }
    if (str === '0' || str === 'false' || str === 'no') {
      return false;
    }
    throw new Error(`Could not cast "${inspect(v)}" to boolean`);
  }
}

function to(v, type) {
  if (v == null) {
    return v;
  }

  if (type === Any) {
    return v;
  }

  if (typeof type === 'string') {
    if (!CAST_PRIMITIVES[type]) {
      throw new Error(`"${type}" is not a valid primitive type`);
    }

    if (type === 'number' && Number.isNaN(v)) {
      return CAST_PRIMITIVES[type](v);
    }
    if (typeof v === type) {
      return v;
    }
    return CAST_PRIMITIVES[type](v);
  }

  if (!(v instanceof type)) {
    return new type(v);
  }
  return v;
}
