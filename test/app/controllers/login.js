'use strict';

const async    = require('async');
const chai     = require('chai');
const chaiHttp = require('chai-http');
const app      = require('../../../app');
const helpers  = require('../../helpers');
const expect   = chai.expect;

chai.use(chaiHttp);

describe('/login', () => {

  let user;

  before(done => {

    async.waterfall([
      helpers.database,
      helpers.credentials,
      helpers.login
    ], (err, key, generatedUser) => {
      console.log(err, key, generatedUser);
      done();
    });

  });


  it('should do something' , (done) => {

    const username = user.username;
    const password = 'test-password';

    chai
      .request(app)
      .post('/login')
      .send({username, password})
      .exec( (err, resp) => {
        console.log(resp);
        done();
      });

  });

  after(done => {
    done();
  });

});