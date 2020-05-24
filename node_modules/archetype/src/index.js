'use strict';

const Path = require('./path');
const Type = require('./type');
const cloneDeep = require('lodash.clonedeep');
const get = require('./get');
const set = require('lodash.set');
const specialProperties = require('./specialProperties');
const unmarshal = require('./unmarshal');

class Archetype {
  constructor(obj) {
    this._obj = cloneDeep(obj);
    this._paths = {};
  }

  compile(name) {
    const _this = this;
    this._paths = visitor(this._obj);

    class _Type extends Type {
      static paths() {
        return _this.paths();
      }

      static path(path, props, opts) {
        return _this.path(path, props, opts);
      }

      static omit(paths) {
        return _this.omit(paths);
      }

      static pick(paths) {
        return _this.pick(paths);
      }

      static transform(fn) {
        return _this.transform(fn);
      }

      static eachPath(fn) {
        return _this.eachPath(fn);
      }
    }

    _Type.schema = this;
    if (name != null) {
      _Type.toString = () => name;
      Object.defineProperty(_Type, 'name', { value: name });
    }

    return _Type;
  }

  json() {
    return this._obj;
  }

  path(path, props, options) {
    if (!props) {
      return get(this._obj, path);
    }
    if (get(options, 'inPlace')) {
      set(this._obj, path, props);
      return this;
    }
    const newSchema = new Archetype(this._obj);
    set(newSchema._obj, path, props);
    return newSchema;
  }

  omit(paths) {
    const newSchema = new Archetype(this._obj);
    if (Array.isArray(paths)) {
      for (const path of paths) {
        unset(newSchema._obj, path);
      }
    } else {
      unset(newSchema._obj, paths);
    }
    return newSchema;
  }

  pick(paths) {
    const obj = {};
    paths = Array.isArray(paths) ? paths : [paths];
    for (const path of paths) {
      obj[path] = this._obj[path];
    }
    const newSchema = new Archetype(obj);
    return newSchema;
  }

  transform(fn) {
    const newSchema = new Archetype(this._obj);
    newSchema._transform(fn, newSchema._obj, []);
    return newSchema;
  }

  _transform(fn, obj, path) {
    Object.keys(obj).forEach(key => {
      obj[key] = fn(path.concat([key]).join('.'), obj[key]);
      if (typeof obj[key] === 'object' && obj[key] && !('$type' in obj[key])) {
        this._transform(fn, obj[key], path.concat([key]));
      }
    });
  }

  eachPath(fn) {
    this._eachPath(fn, this._obj, []);
  }

  _eachPath(fn, obj, path) {
    Object.keys(obj).forEach(key => {
      fn(path.concat([key]).join('.'), obj[key]);
      if (typeof obj[key] === 'object' && obj[key] && !('$type' in obj[key])) {
        this._eachPath(fn, obj[key], path.concat([key]));
      }
    });
  }

  paths() {
    return Object.keys(this._paths).
      map(path => Object.assign({}, this._paths[path], { path }));
  }

  unmarshal(obj, projection) {
    return unmarshal(obj, this, projection);
  }
}

function visitor(obj) {
  var paths = paths || {};

  visitObject(obj, '', paths);
  return paths;
}

function visitArray(arr, path, paths) {
  paths[path] = new Path({ $type: Array });
  if (arr.length > 0) {
    if (Array.isArray(arr[0])) {
      visitArray(arr[0], path + '.$', paths);
    } else if (typeof arr[0] === 'object') {
      visitObject(arr[0], path + '.$', paths);
    } else {
      paths[path + '.$'] = new Path({ $type: arr[0] });
    }
  } else {
    paths[path + '.$'] = new Path({ $type: null });
  }
  return paths[path];
}

function visitObject(obj, path, paths) {
  if ('$type' in obj) {
    if (Array.isArray(obj.$type)) {
      visitArray(obj.$type, path, paths);
      const withoutType = Object.keys(obj).
        filter(key => key !== '$type').
        reduce((clone, key) => {
          clone[key] = obj[key];
          return clone;
        }, {});
      paths[path] = new Path(Object.assign(paths[path], withoutType));
      return;
    }

    if (obj.$type == null) {
      throw new Error(`Path ${path} has nullish $type. Use Archetype.Any to skip casting`);
    }

    paths[path] = new Path(obj);
    return;
  }

  if (path) {
    paths[path] = new Path({ $type: Object, $schema: obj });
  }
  Object.keys(obj).forEach(function(key) {
    const value = obj[key];
    if (Array.isArray(value)) {
      visitArray(value, join(path, key), paths);
    } else if (typeof value === 'object') {
      visitObject(value, join(path, key), paths);
    } else {
      paths[join(path, key)] = new Path({ $type: value });
    }
  });
}

function join(path, key) {
  if (path) {
    return path + '.' + key;
  }
  return key;
}

function unset(obj, path) {
  const pieces = path.split('.');
  let i = 0;
  for (i = 0; i < pieces.length - 1; ++i) {
    if (specialProperties.has(pieces[i])) {
      continue;
    }
    if (obj == null) {
      return;
    }
    obj = obj[pieces[i]];
  }
  delete obj[pieces[pieces.length - 1]];
}

exports.Archetype = Archetype;
exports.CastError = require('./unmarshal/error');
