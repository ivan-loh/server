'use strict';

const chai     = require('chai');
const chaiHttp = require('chai-http');
const app      = require('../../app');

chai.use(chaiHttp);
chai.should();


module.exports = function (user, done) {

  chai
    .request(app)
    .post('/login')
    .send({username: user.username, password: user.password})
    .then( res => {
      done(null, res.body, user);
    })
    .catch(console.log);

};
