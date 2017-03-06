'use strict';

const express = require('express');
const guard   = require('express-jwt-permissions')();
const router  = express.Router();

module.exports = (app) => {
  app.use('/ping', router);
};

router.use(guard.check('ping'));

router.get('/', (req, res) => {
  res.jsonp("pong");
});