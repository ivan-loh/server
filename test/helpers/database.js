'use strict';

const glob     = require('glob');
const doWhilst = require('async/doWhilst');
const mongoose = require('mongoose');
const config   = require('../../config');

module.exports = (done) => {

  mongoose.Promise = global.Promise;

  const disconnected  = 0;
  const connected     = 1;
  const connecting    = 2;
  const disconnecting = 3;
  const connection    = mongoose.connection;
  const state         = connection.readyState;

  if (state === connected || state === connecting ) {
    return done();
  }

  mongoose.connect(config.db);
  connection
    .on('connected', () => {
      glob
        .sync(config.root + '/app/models/*.js')
        .forEach(model => require(model));
      done();
    });

  connection
    .on('error', (err) => {
      throw new Error('unable to connect to database, ' + config.db);
    });

};