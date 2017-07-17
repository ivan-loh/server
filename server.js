'use strict';

const {PORT} = require('./config');

const app = require('./app');

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
});