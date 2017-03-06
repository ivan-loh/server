'use strict';

const async    = require('async');
const uuid     = require('uuid/v4');
const chai     = require('chai');
const chaiHttp = require('chai-http');
const app      = require('../../../app');
const helpers  = require('../../helpers');
const expect   = chai.expect;

chai.use(chaiHttp);

describe('/ping', () => {

  let user, key;

  before(done => {

    async.waterfall([
      helpers.database,
      helpers.credentials,
      helpers.login
    ], (err, generatedKey, generatedUser) => {
      key  = 'Bearer ' + generatedKey;
      user = generatedUser;
      done();
    });

  });


  it('should be able to pong a ping' , (done) => {

    chai
      .request(app)
      .get('/ping')
      .set('Authorization', key)
      .then( response => {
        expect(response.body).to.exist;
        expect(response.body).to.eql('pong');
        done();
      })
      .catch(done);
  });

  it('should not pong to unauthorized', (done) => {

    chai
      .request(app)
      .post('/ping')
      .set('Authorization', 'Bearer ' + uuid())
      .then( response => {
      })
      .catch(err => {
        expect(err).to.exist;
        expect(err.status).to.equal(401);
        done();
      })

  });


});