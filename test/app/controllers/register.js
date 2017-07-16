'use strict';

const async    = require('async');
const uuid     = require('uuid/v4');
const chai     = require('chai');
const chaiHttp = require('chai-http');
const app      = require('../../../app');
const helpers  = require('../../helpers');
const expect   = chai.expect;

chai.use(chaiHttp);

describe('/register', () => {

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


  it('should be able to register and then login' , (done) => {

    const username = uuid();
    const password = uuid();

    async.series([

      next => {

        chai
          .request(app)
          .post('/register')
          .send({username, password})
          .then( response => {
            expect(response.body).to.exist;

            const token = response.body.split('.');
            const header = token[0];
            const body   = token[1];
            const sign   = token[2];

            const payload = JSON.parse(new Buffer(body, 'base64').toString());

            expect(payload.username).to.equal(username);
            expect(payload.password).to.be.undefined;

            next();
          })
          .catch(next);

        },

      next => {

        chai
          .request(app)
          .post('/login')
          .send({username, password})
          .then( response => {
            expect(response.body).to.exist;
            next();
          })
          .catch(next);

      }

    ], done);

  });

});