'use strict';

const pack = require('./package.json');
const path = require('path').normalize(__dirname);

const {
        NODE_ENV = 'dev',
        ROOT     = path,
        SECRET   = 'something something something',
        PORT     = 3000,
        DB_URI   = `mongodb://127.0.0.1:27017/${pack.name}`
      } = process.env;

module.exports = {
  NODE_ENV,
  ROOT,
  SECRET,
  PORT,
  DB_URI
};
