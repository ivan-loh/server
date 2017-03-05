'use strict';

const uuid     = require('uuid/v4');
const mongoose = require('mongoose');

module.exports = (done) => {

  const User = mongoose.model('User');
  const user = {
    organization: uuid(),
    username:     uuid(),
    password:     uuid(),
    permissions:  [
      'admin',
      'system:read',
      'system:write',
      'document:read',
      'document:write'
    ]
  };

  new User(user)
    .save(() => done(null, user));

};
