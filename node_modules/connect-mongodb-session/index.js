'use strict';

const Archetype = require('archetype');
const EventEmitter = require('events').EventEmitter;
const mongodb = require('mongodb');

const OptionsType = new Archetype({
  uri: {
    $type: 'string',
    $required: true,
    $default: 'mongodb://localhost:27017/test'
  },
  collection: {
    $type: 'string',
    $required: true,
    $default: 'sessions'
  },
  connectionOptions: {
    $type: Object,
    $default: () => ({ useNewUrlParser: true, useUnifiedTopology : true })
  },
  expires: {
    $type: 'number',
    $required: true,
    $default: 1000 * 60 * 60 * 24 * 14 // 2 weeks
  },
  idField: {
    $type: 'string',
    $required: true,
    $default: '_id'
  },
  databaseName: {
    $type: 'string',
    $required: false,
    $default: null
  }
}).compile('OptionsType');

/**
 * Returns a constructor with the specified connect middleware's Store
 * class as its prototype
 *
 * ####Example:
 *
 *     connectMongoDBSession(require('express-session'));
 *
 * @param {Function} connect connect-compatible session middleware (e.g. Express 3, express-session)
 * @api public
 */
module.exports = function(connect) {
  const Store = connect.Store || connect.session.Store;

  const MongoDBStore = function(options, callback) {
    const _this = this;
    this._emitter = new EventEmitter();
    this._errorHandler = handleError.bind(this);
    this.client = null;
    this.db = null;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    } else {
      options = options || {};
    }

    options = new OptionsType(options);

    Store.call(this, options);
    this.options = options;

    const connOptions = options.connectionOptions;
    mongodb.MongoClient.connect(options.uri, connOptions, function(error, client) {
      if (error) {
        var e = new Error('Error connecting to db: ' + error.message);
        return _this._errorHandler(e, callback);
      }

      const db = options.databaseName == null ?
        client.db() :
        client.db(options.databaseName);
      _this.client = client;
      _this.db = db;

      db.
        collection(options.collection).
        createIndex({ expires: 1 }, { expireAfterSeconds: 0 }, function(error) {
          if (error) {
            const e = new Error('Error creating index: ' + error.message);
            return _this._errorHandler(e, callback);
          }

          _this._emitter.emit('connected');

          return callback && callback();
        });
    });
  };

  MongoDBStore.prototype = Object.create(Store.prototype);

  MongoDBStore.prototype._generateQuery = function(id) {
    const ret = {};
    ret[this.options.idField] = id;
    return ret;
  };

  MongoDBStore.prototype.get = function(id, callback) {
    const _this = this;

    if (!this.db) {
      return this._emitter.once('connected', function() {
        _this.get.call(_this, id, callback);
      });
    }

    this.db.collection(this.options.collection).
      findOne(this._generateQuery(id), function(error, session) {
        if (error) {
          const e = new Error('Error finding ' + id + ': ' + error.message);
          return _this._errorHandler(e, callback);
        } else if (session) {
          if (!session.expires || new Date < session.expires) {
            return callback(null, session.session);
          } else {
            return _this.destroy(id, callback);
          }
        } else {
          return callback();
        }
      });
  };

  // new store.all() for all sessions

  MongoDBStore.prototype.all = function(callback) {
    const _this = this;

    if (!this.db) {
      return this._emitter.once('connected', function() {
        _this.all.call(_this, callback);
      });
    }

    this.db.collection(this.options.collection).
      find({}).toArray(function(error, sessions) {
        if (error) {
          const e = new Error('Error gathering sessions');
          return _this._errorHandler(e, callback);
        } else if (sessions) {
          if (sessions) {
            return callback(null, sessions);
          } 
        } else {
          return callback();
        }
      });
  };

  MongoDBStore.prototype.destroy = function(id, callback) {
    const _this = this;
    if (!this.db) {
      return this._emitter.once('connected', function() {
        _this.destroy.call(_this, id, callback);
      });
    }

    this.db.collection(this.options.collection).
      deleteOne(this._generateQuery(id), function(error) {
        if (error) {
          const e = new Error('Error destroying ' + id + ': ' + error.message);
          return _this._errorHandler(e, callback);
        }
        callback && callback();
      });
  };

  MongoDBStore.prototype.clear = function(callback) {
    const _this = this;
    if (!this.db) {
      return this._emitter.once('connected', function() {
        _this.clear.call(_this, callback);
      });
    }

    this.db.collection(this.options.collection).
      deleteMany({}, function(error) {
        if (error) {
          const e = new Error('Error clearing all sessions: ' + error.message);
          return _this._errorHandler(e, callback);
        }
        callback && callback();
      });
  };

  MongoDBStore.prototype.set = function(id, session, callback) {
    const _this = this;

    if (!this.db) {
      return this._emitter.once('connected', function() {
        _this.set.call(_this, id, session, callback);
      });
    }

    const sess = {};
    for (const key in session) {
      if (key === 'cookie') {
        sess[key] = session[key].toJSON ? session[key].toJSON() : session[key];
      } else {
        sess[key] = session[key];
      }
    }

    const s = this._generateQuery(id);
    s.session = sess;
    if (session && session.cookie && session.cookie.expires) {
      s.expires = new Date(session.cookie.expires);
    } else {
      const now = new Date();
      s.expires = new Date(now.getTime() + this.options.expires);
    }

    this.db.collection(this.options.collection).
      updateOne(this._generateQuery(id), { $set: s }, { upsert: true }, function(error) {
        if (error) {
          const e = new Error('Error setting ' + id + ' to ' +
            require('util').inspect(session) + ': ' + error.message);
          return _this._errorHandler(e, callback);
        }
        callback && callback();
      });
  };

  MongoDBStore.prototype.on = function() {
    this._emitter.on.apply(this._emitter, arguments);
  };

  MongoDBStore.prototype.once = function() {
    this._emitter.once.apply(this._emitter, arguments);
  };

  return MongoDBStore;
};

function handleError(error, callback) {
  if (this._emitter.listeners('error').length) {
    this._emitter.emit('error', error);
  }

  if (callback) {
    callback(error);
  }

  if (!this._emitter.listeners('error').length && !callback) {
    throw error;
  }
}
