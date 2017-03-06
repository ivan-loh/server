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


  it('should be able to login properly' , (done) => {

    const username = user.username;
    const password = user.password;

    chai
      .request(app)
      .post('/login')
      .send({username, password})
      .then( response => {
        expect(response.body).to.exist;
        done();
      })
      .catch(done);
  });

  it('should deny access to unknown users', (done) => {

    const username = uuid();
    const password = uuid();

    chai
      .request(app)
      .post('/login')
      .send({username, password})
      .then( response => {
      })
      .catch(err => {
        expect(err).to.exist;
        expect(err.status).to.equal(401);
        expect(err.response.error.text).to.equal('invalid credentials');
        done();
      })

  });


});