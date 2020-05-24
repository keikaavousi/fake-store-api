# connect-mongodb-session

[MongoDB](http://mongodb.com)-backed session storage for [connect](https://www.npmjs.org/package/connect) and [Express](http://www.expressjs.com). Meant to be a well-maintained and fully-featured replacement for modules like [connect-mongo](https://www.npmjs.org/package/connect-mongo)

[![Build Status](https://travis-ci.org/mongodb-js/connect-mongodb-session.svg?branch=master)](https://travis-ci.org/mongodb-js/connect-mongodb-session) [![Coverage Status](https://coveralls.io/repos/mongodb-js/connect-mongodb-session/badge.svg?branch=master)](https://coveralls.io/r/mongodb-js/connect-mongodb-session?branch=master)



# MongoDBStore


This module exports a single function which takes an instance of connect
(or Express) and returns a `MongoDBStore` class that can be used to
store sessions in MongoDB.


## It can store sessions for Express 4


If you pass in an instance of the
[`express-session` module](http://npmjs.org/package/express-session)
the MongoDBStore class will enable you to store your Express sessions
in MongoDB.

The MongoDBStore class has 3 required options:

1. `uri`: a [MongoDB connection string](http://docs.mongodb.org/manual/reference/connection-string/)
2. `databaseName`: the MongoDB database to store sessions in
3. `collection`: the MongoDB collection to store sessions in

**Note:** You can pass a callback to the `MongoDBStore` constructor,
but this is entirely optional. The Express 3.x example demonstrates
that you can use the MongoDBStore class in a synchronous-like style: the
module will manage the internal connection state for you.


```javascript
var express = require('express');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var app = express();
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
  collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
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
```

## It throws an error when it can't connect to MongoDB


You should pass a callback to the `MongoDBStore` constructor to catch
errors. If you don't pass a callback to the `MongoDBStore` constructor,
`MongoDBStore` will `throw` if it can't connect.


```javascript
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
  });

store.on('error', function(error) {
  // Also get an error here
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
```
