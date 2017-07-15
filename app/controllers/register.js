'use strict';

const {SECRET} = require('../../config');

const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const User     = mongoose.model('User');

module.exports = (app) => {
  app.use('/register', router);
};

router.post('/', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res
      .status(400)
      .send('invalid request');
  }

  new User({username, password})
    .save((err) => {

      if (err) {
        return res.status(400)
          .send(err);
      }

      res.status(200)
        .jsonp(jwt.sign({username}, SECRET, {expiresIn: '12h'}));

    });

});