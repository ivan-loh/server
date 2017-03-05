'use strict';

const mongoose = require('mongoose');
const crypto   = require('crypto');
const pbkdf2   = crypto.pbkdf2;

const SALT   = require('../../config').secret;
const ITER   = 100000;
const KEYLEN = 512;
const DIGEST = 'sha512';



const userSchema = mongoose.Schema({
  username:    {type: String, required: true, unique: true},
  password:    {type: String, required: true},
  permissions: [String]
});

userSchema
  .pre('save', next => {

    const user       = this;
    const changePass = user.isModified('password');
    if (!changePass) { return next(); }

    pbkdf2(user.password, SALT, ITER, KEYLEN, DIGEST, (err, key) => {
      if (err) { return next(err); }
      user.password = key.toString('hex');
      next();
    });

  });

userSchema
  .methods
  .comparePassword = (password, next) => {
    pbkdf2(password, SALT, ITER, KEYLEN, DIGEST, (err, key) => {
      if (err) { return next(err); }
      const isMatch = this.password === key.toString('hex');
      next(null, isMatch);
    });
  };

module.exports = mongoose.model('User', userSchema);
