'use strict';

const config         = require('./config');
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

const disconnected  = 0;
const disconnecting = 3;
const connection    = mongoose.connection;
const state         = connection.readyState;

if (state === disconnected || state === disconnecting) {
  mongoose.connect(config.db);
  mongoose
    .connection
    .on('error', err => {
      throw new Error('unable to connect to database, ' + config.db, err.message);
    });

  glob
    .sync(config.root + '/app/models/*.js')
    .forEach(model => {
      require(model);
    });
}



/**
 * Web Server
 */

const app = express();
      app.use(logger('dev'));
      app.use(cors());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended: true}));
      app.use(jwt({secret: config.secret}).unless({path: ['/', /\/login[\/(a-z)(A-Z)]*/]}));
      app.use(methodOverride());

// controllers
glob
  .sync(`${config.root}/app/controllers/*.js`)
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
    res.jsonp({
      title:   'error',
      message: err.message,
      err,
    });
  });


module.exports = app;
