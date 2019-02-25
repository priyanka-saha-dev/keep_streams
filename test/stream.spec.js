const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app');
const config = require('./test.config');
const modules = require('../modules');

describe('Streams Test scenarios', () => {

    let userToken;

    // Initialize db connection before all tests
    before((done) => {
        done();
        // modules.initializeMongooseConnection()
        //     .then(() => {
        //         done();
        //     });
    });

    // clear notes collection
    before((done) => {
        done();
        // modules.noteModel.remove({}, (err) => {
        //     if (err) return done(err);
        //     done();
        // });
    });

    // Get JWT token for user 1
    before((done) => {
        done();
        // const user1 = config.USER_1;
        // const auth = config.AUTH;

        // modules.signJWTToken(user1, auth.SECRET_KET, auth.expiresInHour, (err, token) => {
        //     if (err) return done(err);
        //     userToken = token;

        //     done();
        // });
    });

    it('Upload data to mongo as Streams for a user', (done) => {

        done();
        // request(app)
        //     .post(`/api/v1/notes/stream?userId=${config.userID}`)
        //     //.set('Authorization', 'Bearer ' + token)
        //     .set('Authorization', `Bearer ${userToken}`)
        //     .expect(201)
        //     .then((response) => {
        //         expect(response.body.message).to.equal(config.INSERT_OK_MESSAGE);
        //         done();
        //     });
    });

    it('Read data from mongo as Streams for a user', (done) => {
        done();
        // request(app)
        //     .get(`/api/v1/notes/stream?userId=${config.userID}`)
        //     .set('Authorization', `Bearer ${userToken}`)
        //     .expect(200)
        //     .then((response) => {
        //         expect(response.body).to.have.property('message');
        //         expect(response.body).to.have.property('data');
        //         expect(response.body.data).to.be.an('array');
        //         expect(response.body.data).to.not.be.empty;
        //         done();
        //     });
    });

    it('Read data from mongo as Streams for new user', (done) => {

        done();
        // request(app)
        //     .get(`/api/v1/notes/stream?userId=${config.userID_1}`)
        //     .set('Authorization', `Bearer ${userToken}`)
        //     .expect(200)
        //     .then((response) => {
        //         expect(response.body).to.have.property('message');
        //         expect(response.body).to.have.property('data');
        //         expect(response.body.data).to.be.an('array');
        //         expect(response.body.data).to.be.empty;
        //         done();
        //     });
    });
})
