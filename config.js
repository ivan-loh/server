'use strict';

const path = require('path');

const {
  NODE_ENV = 'dev',
  ROOT     = path.normalize(__dirname),
  SECRET   = 'something something something',
  PORT     = 3000,
  DB_URI   = `mongodb://127.0.0.1:27017/${pack.name}`
};

module.exports = {
  NODE_ENV,
  ROOT,
  SECRET,
  PORT,
  DB_URI
};
