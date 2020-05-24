var assert = require('assert');
var connectMongoDBSession = require('../');
var ee = require('events').EventEmitter;
var mongodb = require('mongodb');
var strawman = require('strawman');

describe('connectMongoDBSession', function() {
  var client = {"db": {}};
  var db;
  var StoreStub;

  beforeEach(function() {
    db = strawman({
      collection: { argumentNames: ['collection'], chain: true },
      createIndex: { argumentNames: ['index', 'options', 'callback'] },
      findOne: { argumentNames: ['query', 'callback'] },
      deleteOne: { argumentNames: ['query', 'callback'] },
      deleteMany: { argumentNames: ['query', 'callback'] },
      updateOne: { argumentNames: ['query', 'update', 'options', 'callback' ] }
    });

    client.db = function(n) {return db;};

    mongodb.MongoClient.connect = function(uri, options, callback) {
      process.nextTick(function() { callback(null, client); });
    };

    StoreStub = function() {};
    StoreStub.prototype = { connectMongoDB: 1 };
  });

  describe('options', function() {
    it('can specify uri', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });
      var session = new SessionStore({ uri: 'mongodb://host:port/db' });
      assert.equal(session.options.uri, 'mongodb://host:port/db');
      assert.equal(session.options.idField, '_id');
      done();
    });

    it('can specify collection', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });
      var session = new SessionStore({ collection: 'notSessions' });
      assert.equal(session.options.uri, 'mongodb://localhost:27017/test');
      assert.equal(session.options.collection, 'notSessions');
      done();
    });

    it('can specify expires', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });
      var session = new SessionStore({ expires: 25 });
      assert.equal(session.options.uri, 'mongodb://localhost:27017/test');
      assert.equal(session.options.expires, 25);
      done();
    });

    it('can specify idField', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });
      var session = new SessionStore({ idField: 'sessionId' });
      assert.equal(session.options.uri, 'mongodb://localhost:27017/test');
      assert.deepEqual(session._generateQuery('1234'), { sessionId: '1234' });
      done();
    });

    it('can specify databaseName', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });
      var session = new SessionStore({ databaseName: 'other_db' });
      assert.equal(session.options.databaseName, 'other_db');
      done();
    });
  });

  it('can get Store object from Express 3', function(done) {
    var SessionStore = connectMongoDBSession({ session: { Store: StoreStub } });
    assert.ok(SessionStore.prototype.connectMongoDB);
    done();
  });

  it('specifying options is optional', function(done) {
    var SessionStore = connectMongoDBSession({ Store: StoreStub });
    var numIndexCalls = 0;
    db.createIndex.on('called', function(args) {
      assert.equal(++numIndexCalls, 1);
      assert.equal(args.index.expires, 1);
      args.callback();
    });

    var session = new SessionStore(function(error) {
      assert.ifError(error);
      done();
    });
    assert.equal(session.options.uri, 'mongodb://localhost:27017/test');
  });

  it('uses default options and no callback if no args passed', function(done) {
    var SessionStore = connectMongoDBSession({ Store: StoreStub });
    var numIndexCalls = 0;
    db.createIndex.on('called', function(args) {
      assert.equal(++numIndexCalls, 1);
      assert.equal(args.index.expires, 1);
      args.callback();
    });

    var session = new SessionStore();
    assert.equal(session.options.uri, 'mongodb://localhost:27017/test');

    session.on('connected', function() {
      done();
    });
  });

  it('throws an error when connection fails and no callback', function(done) {
    mongodb.MongoClient.connect = function(uri, options, callback) {
      // purposely make callback sync
      callback(new Error('Cant connect'));
    };

    var SessionStore = connectMongoDBSession({ Store: StoreStub });

    var threw = false;
    try {
      new SessionStore();
    } catch (error) {
      threw = true;
      assert.equal(error.message, 'Error connecting to db: Cant connect');
    }

    done();
  });

  it('passes error to callback if specified', function(done) {
    mongodb.MongoClient.connect = function(uri, options, callback) {
      process.nextTick(function() { callback(new Error('Cant connect')); });
    };

    var SessionStore = connectMongoDBSession({ Store: StoreStub });
    var numSources = 2;
    var store = new SessionStore(function(error) {
      assert.ok(error);
      --numSources || done();
    });
    store.once('error', function(error) {
      assert.ok(error);
      --numSources || done();
    });
  });

  it('handles index errors', function(done) {
    var SessionStore = connectMongoDBSession({ Store: StoreStub });
    var numIndexCalls = 0;
    db.createIndex.on('called', function(args) {
      assert.equal(++numIndexCalls, 1);
      assert.equal(args.index.expires, 1);
      args.callback(new Error('Index fail'));
    });

    var session = new SessionStore(function(error) {
      assert.equal(error.message, 'Error creating index: Index fail');
      done();
    });
  });

  describe('get()', function() {
    var numIndexCalls;

    beforeEach(function() {
      numIndexCalls = 0;

      db.createIndex.on('called', function(args) {
        assert.equal(++numIndexCalls, 1);
        assert.equal(args.index.expires, 1);
        args.callback();
      });
    });

    it('buffers get() calls', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });
      var emitter = new ee();

      mongodb.MongoClient.connect = function(uri, options, callback) {
        emitter.on('success', function() {
          callback(null, client);
        });
      };

      var session = new SessionStore();

      db.findOne.on('called', function(args) {
        args.callback(null,
          { expires: new Date('2040-06-01T00:00:00.000Z'), session: { data: 1 } });
      });
      session.get('1234', function(error) {
        assert.ifError(error);
        assert.equal(numIndexCalls, 1);
        done();
      });

      setImmediate(function() {
        emitter.emit('success');
      });
    });

    it('handles get() errors', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });

      var session = new SessionStore();
      db.findOne.on('called', function(args) {
        args.callback(new Error('fail!'));
      });

      session.get('1234', function(error) {
        assert.ok(error);
        assert.equal(error.message, 'Error finding 1234: fail!');
        done();
      });
    });

    it('calls destroy() on stale sessions', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });
      var numRemoveCalls = 0;

      var session = new SessionStore();
      db.findOne.on('called', function(args) {
        args.callback(null, { expires: new Date('2011-06-01T00:00:00.000Z') });
      });

      db.deleteOne.on('called', function(args) {
        ++numRemoveCalls;
        assert.equal(args.query._id, '1234');
        args.callback();
      });

      session.get('1234', function(error, doc) {
        assert.ifError(error);
        assert.ok(!doc);
        assert.equal(numRemoveCalls, 1);
        done();
      });
    });

    it('returns empty if no session found', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });

      var session = new SessionStore();
      db.findOne.on('called', function(args) {
        args.callback(null, null);
      });

      session.get('1234', function(error, doc) {
        assert.ifError(error);
        assert.ok(!doc);
        done();
      });
    });
  });

  describe('destroy()', function() {
    var numIndexCalls;

    beforeEach(function() {
      numIndexCalls = 0;

      db.createIndex.on('called', function(args) {
        assert.equal(++numIndexCalls, 1);
        assert.equal(args.index.expires, 1);
        args.callback();
      });
    });

    it('buffers until connected', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });
      var emitter = new ee();

      mongodb.MongoClient.connect = function(uri, options, callback) {
        emitter.on('success', function() {
          callback(null, client);
        });
      };

      var session = new SessionStore();

      db.deleteOne.on('called', function(args) {
        args.callback(null);
      });
      session.destroy('1234', function(error) {
        assert.ifError(error);
        assert.equal(numIndexCalls, 1);
        done();
      });

      setImmediate(function() {
        emitter.emit('success');
      });
    });

    it('reports driver errors', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });

      var session = new SessionStore();
      db.deleteOne.on('called', function(args) {
        args.callback(new Error('fail!'));
      });

      session.destroy('1234', function(error) {
        assert.ok(error);
        assert.equal(error.message, 'Error destroying 1234: fail!');
        done();
      });
    });
  });

  describe('set()', function(done) {
    var numIndexCalls;

    beforeEach(function() {
      numIndexCalls = 0;

      db.createIndex.on('called', function(args) {
        assert.equal(++numIndexCalls, 1);
        assert.equal(args.index.expires, 1);
        args.callback();
      });
    });

    it('buffers until connected', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });
      var emitter = new ee();

      mongodb.MongoClient.connect = function(uri, options, callback) {
        emitter.on('success', function() {
          callback(null, client);
        });
      };

      var session = new SessionStore();

      db.updateOne.on('called', function(args) {
        args.callback(null);
      });
      session.set('1234', { test: 1 }, function(error) {
        assert.ifError(error);
        assert.equal(numIndexCalls, 1);
        done();
      });

      setImmediate(function() {
        emitter.emit('success');
      });
    });

    it('converts expires to a date', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });

      var session = new SessionStore();

      db.updateOne.on('called', function(args) {
        assert.ok(args.update.$set.expires instanceof Date);
        assert.equal(args.update.$set.expires.getTime(),
          new Date('2011-06-01T00:00:00.000Z').getTime());
        args.callback(null);
      });
      var update = {
        test: 1,
        cookie: { expires: '2011-06-01T00:00:00.000Z' }
      };
      session.set('1234', update, function(error) {
        assert.ifError(error);
        assert.equal(db.updateOne.calls.length, 1);
        done();
      });
    });

    it('handles set() errors', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });

      var session = new SessionStore();
      db.updateOne.on('called', function(args) {
        args.callback(new Error('fail!'));
      });

      session.set('1234', {}, function(error) {
        assert.ok(error);
        assert.equal(error.message, 'Error setting 1234 to {}: fail!');
        done();
      });
    });

    /** For backwards compatibility with connect-mongo */
    it('converts cookies to JSON strings', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });

      var session = new SessionStore();

      db.updateOne.on('called', function(args) {
        assert.equal(args.update.$set.session.cookie, 'put that cookie down!');
        args.callback(null);
      });
      var update = {
        test: 1,
        cookie: { toJSON: function() { return 'put that cookie down!'; } }
      };
      session.set('1234', update, function(error) {
        assert.ifError(error);
        assert.equal(db.updateOne.calls.length, 1);
        done();
      });
    });

    /** For backwards compatibility with connect-mongo */
    it('unless they do not have a toJSON()', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });

      var session = new SessionStore();

      db.updateOne.on('called', function(args) {
        assert.deepEqual(args.update.$set.session.cookie, { test: 2 });
        args.callback(null);
      });
      var update = {
        test: 1,
        cookie: { test: 2 }
      };
      session.set('1234', update, function(error) {
        assert.ifError(error);
        assert.equal(db.updateOne.calls.length, 1);
        done();
      });
    });
  });

  describe('clear()', function(done){
    var numIndexCalls;

    beforeEach(function() {
      numIndexCalls = 0;

      db.createIndex.on('called', function(args) {
        assert.equal(++numIndexCalls, 1);
        assert.equal(args.index.expires, 1);
        args.callback();
      });
    });

    it('clears the session store', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });

      var session = new SessionStore();
      db.deleteMany.on('called', function(args) {
        args.callback(null);
      });

      session.clear(function(error) {
        assert.ifError(error);
        done();
      });
    });

    it('handles set() errors', function(done) {
      var SessionStore = connectMongoDBSession({ Store: StoreStub });

      var session = new SessionStore();
      db.deleteMany.on('called', function(args) {
        args.callback(new Error('fail!'));
      });

      session.clear(function(error) {
        assert.ok(error);
        assert.equal(error.message, 'Error clearing all sessions: fail!');
        done();
      });
    });
  });
});
