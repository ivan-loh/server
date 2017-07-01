'use strict';

const { NODE_ENV, ROOT, SECRET, DB_URI } = require('./config');


const express        = require('express');
const glob           = require('glob');
const mongoose       = require('mongoose');
const methodOverride = require('method-override');
const bodyParser     = require('body-parser');
const jwt            = require('express-jwt');
const logger         = require('morgan');
const cors           = require('cors');



/**
 * Database
 */

mongoose.Promise = global.Promise;
const connection = mongoose.connection;
const state      = connection.readyState;

// 0 - disconnected, 3 - disconnectiong
// ref: http://mongoosejs.com/docs/api.html#connection_Connection-readyState

if (state === 0 || state === 3) {

  mongoose.connect(DB_URI, {useMongoClient:true});

  connection.on('error', err => {
    throw new Error(`unable to connect to database,  ${DB_URI}`. err.message);
  });

  glob
    .sync(`${ROOT}/app/models/*.js`)
    .forEach(model => { require(model); });
}



/**
 * Web Server
 */

const app = express();

if (process.env.NODE_ENV !== 'testing') {
  app.use(logger('dev'));
}

const publicPaths = [ '/',
                      /\/login[\/(a-z)(A-Z)]*/,
                      /\/register[\/(a-z)(A-Z)]*/ ];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(jwt({secret: SECRET}).unless({path: publicPaths}));
app.use(methodOverride());

glob
  .sync(`${ROOT}/app/controllers/*.js`)
  .forEach(controller => require(controller)(app));

app
  .use((req, res, next) => {
    const err = new Error('Not Found');
          err.status = 404;
    next(err);
  });

app
  .use((err, req, res, next) => {
    res.status(err.status || 500);
    res.jsonp({title: 'error', message: err.message, error: err});
  });


module.exports = app;
