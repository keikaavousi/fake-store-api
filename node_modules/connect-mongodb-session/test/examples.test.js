var assert = require('assert');
var superagent = require('superagent');
var mongodb = require('mongodb');

/**
 *  This module exports a single function which takes an instance of connect
 *  (or Express) and returns a `MongoDBStore` class that can be used to
 *  store sessions in MongoDB.
 */
describe('MongoDBStore', function() {
  var underlyingDb;
  var server;

  beforeEach(function(done) {
    mongodb.MongoClient.connect(
      'mongodb://localhost:27017/connect_mongodb_session_test',
      function(error, client) {
        if (error) {
          return done(error);
        }
        underlyingDb = client.db('connect_mongodb_session_test');
        client.db('connect_mongodb_session_test').collection('mySessions').deleteMany({}, function(error) {
          return done(error);
        });
      });
  });

  afterEach(function() {
    server.close();
  });

  /**
   *  If you pass in an instance of the
   *  [`express-session` module](http://npmjs.org/package/express-session)
   *  the MongoDBStore class will enable you to store your Express sessions
   *  in MongoDB.
   *
   *  The MongoDBStore class has 3 required options:
   *
   *  1. `uri`: a [MongoDB connection string](http://docs.mongodb.org/manual/reference/connection-string/)
   *  2. `databaseName`: the MongoDB database to store sessions in
   *  3. `collection`: the MongoDB collection to store sessions in
   *
   *  **Note:** You can pass a callback to the `MongoDBStore` constructor,
   *  but this is entirely optional. The Express 3.x example demonstrates
   *  that you can use the MongoDBStore class in a synchronous-like style: the
   *  module will manage the internal connection state for you.
   */
  it('can store sessions for Express 4', function(done) {
    var express = require('express');
    var session = require('express-session');
    var MongoDBStore = require('connect-mongodb-session')(session);

    var app = express();
    var store = new MongoDBStore({
      uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
      collection: 'mySessions'
    });
    // acquit:ignore:start

    store.on('connected', function() {
      store.client; // The underlying MongoClient object from the MongoDB driver
      assert.ok(store.client);
      assert.ok(store.db);
    });
    // acquit:ignore:end

    // Catch errors
    store.on('error', function(error) {
      console.log(error);
      // acquit:ignore:start
      assert.ifError(error);
	    assert.ok(false);
      // acquit:ignore:end
    });

    app.use(require('express-session')({
      secret: 'This is a secret',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      },
      store: store,
      // Boilerplate options, see:
      // * https://www.npmjs.com/package/express-session#resave
      // * https://www.npmjs.com/package/express-session#saveuninitialized
      resave: true,
      saveUninitialized: true
    }));

    app.get('/', function(req, res) {
      res.send('Hello ' + JSON.stringify(req.session));
    });

    server = app.listen(3000);

    // acquit:ignore:start
    underlyingDb.collection('mySessions').countDocuments({}, function(error, count) {
      assert.ifError(error);
      assert.equal(0, count);

      superagent.get('http://localhost:3000', function(error, response) {
        assert.ifError(error);
        assert.equal(1, response.headers['set-cookie'].length);
        var cookie = require('cookie').parse(response.headers['set-cookie'][0]);
        assert.ok(cookie['connect.sid']);
        underlyingDb.collection('mySessions').countDocuments({}, function(error, count) {
          assert.ifError(error);
          assert.equal(1, count);
          superagent.get('http://localhost:3000').set('Cookie', 'connect.sid=' + cookie['connect.sid']).end(function(error, response) {
            assert.ok(!response.headers['set-cookie']);
            store.clear(function(error) {
              assert.ifError(error);
              underlyingDb.collection('mySessions').countDocuments({}, function(error, count) {
                assert.ifError(error);
                assert.equal(0, count);
                done();
              });
            });
          });
        });
      });
    });
    // acquit:ignore:end
  });

  /**
   *  You should pass a callback to the `MongoDBStore` constructor to catch
   *  errors. If you don't pass a callback to the `MongoDBStore` constructor,
   *  `MongoDBStore` will `throw` if it can't connect.
   */
  it('throws an error when it can\'t connect to MongoDB', function(done) {
    var express = require('express');
    var session = require('express-session');
    var MongoDBStore = require('connect-mongodb-session')(session);

    var app = express();
    var numExpectedSources = 2;
    var store = new MongoDBStore(
      {
        uri: 'mongodb://bad.host:27000/connect_mongodb_session_test?connectTimeoutMS=10',
        databaseName: 'connect_mongodb_session_test',
        collection: 'mySessions'
      },
      function(error) {
        // Should have gotten an error
        // acquit:ignore:start
        assert.ok(error);
        --numExpectedSources || done();
        // acquit:ignore:end
      });

    store.on('error', function(error) {
      // Also get an error here
      // acquit:ignore:start
      assert.ok(error);
      --numExpectedSources || done();
      // acquit:ignore:end
    });

    app.use(session({
      secret: 'This is a secret',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      },
      store: store,
      // Boilerplate options, see:
      // * https://www.npmjs.com/package/express-session#resave
      // * https://www.npmjs.com/package/express-session#saveuninitialized
      resave: true,
      saveUninitialized: true
    }));

    app.get('/', function(req, res) {
      res.send('Hello ' + JSON.stringify(req.session));
    });

    server = app.listen(3000);
  });
});
