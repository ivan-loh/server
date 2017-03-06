'use strict';

const config = require('./config');
const app    = require('./app');

app.listen(
  config.port,
  () => {
    console.log(`${config.app.name} listening on port ${config.port}`)
  }
);