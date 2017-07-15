'use strict';

const async    = require('async');
const uuid     = require('uuid/v4');
const chai     = require('chai');
const chaiHttp = require('chai-http');
const app      = require('../../../app');
const helpers  = require('../../helpers');
const expect   = chai.expect;

chai.use(chaiHttp);

describe('/login', () => {

  let user, key;

  before(done => {

    async.waterfall([
      helpers.database,
      helpers.credentials,
      helpers.login
    ], (err, generatedKey, generatedUser) => {
      key  = generatedKey;
      user = generatedUser;
      done();
    });

  });


  it('should be able to register properly' , (done) => {

    const username = user.username;
    const password = user.password;

    chai
      .request(app)
      .post('/register')
      .send({username, password})
      .then( response => {
        expect(response.body).to.exist;
        done();
      })
      .catch(done);
  });

});