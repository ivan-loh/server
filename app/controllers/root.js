'use strict';

const express = require('express');
const router  = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', (req, res) => {
  res.jsonp('you should not see this, please contact a system administrator');
});
