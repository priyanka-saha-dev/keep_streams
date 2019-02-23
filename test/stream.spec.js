const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app');
const config = require('./test.config');
const log = require('../logger');

describe('Streams Test scenarios', () => {

    let token;

    // before('DB connection', () => {
    //     appservice.connectToDatabase();
    // });

    it('test', (done) => {
        
        try {
            request(app)
            .get(`api/v1/`)
            .expect(200)
            .then((response) => {
                done();
            });
        } catch (error) {
            log.info('error :', error);
            
        }
        
    });

    // it('Register a user', (done) => {
        

    //     try {
    //         request(app)
    //         .post(`api/v1/users/register/`)
    //         .send(config.USER_1)
    //         .expect(201)
    //         .then((response) => {
    //             expect(response.body).to.have.property('userInfo');
    //             expect(response.body.userInfo).to.equal(config.USER_1.username);
    //             done();
    //         });
    //     } catch (error) {
    //         log.info('error :', error);
            
    //     }
        
    // });

    // it('Login a user', () => {
    //     //done();

    //     request(app)
    //         .post(`api/v1/users/login`)
    //         .send(config.USER_1)
    //         .expect(200)
    //         .then((response) => {

    //             expect(response.body).to.have.property('user');
    //             expect(response.body).to.have.property('token');

    //             expect(response.body.user).to.have.property('userName');
    //             expect(response.body.user.userName).to.equal(config.USER_1.username);

    //             token = response.body.token;

    //             done();
    //         });
    // });

    // it('Upload data to mongo as Streams for a user', () => {
    //     request(app)
    //         .post(`api/v1/notes/streams?userId=${config.userID}`)
    //         .set('Authorization', `Bearer ${token}`)
    //         .expect(201)
    //         .then((response) => {
    //             expect(response.body.message).to.equal(config.INSERT_OK_MESSAGE);
    //             done();
    //         });
    // });

    // it('Read data from mongo as Streams for a user', () => {
    //     request(app)
    //         .get(`api/v1/notes/streams?userId=${config.userID}`)
    //         .set('Authorization', `Bearer ${token}`)
    //         .expect(200)
    //         .then((response) => {
    //             expect(response.body).to.have.property('message');
    //             expect(response.body).to.have.property('data');
    //             expect(response.body.data).to.be.an('array');
    //             expect(response.body.data).to.not.be.empty;
    //             done();
    //         });
    // });

    // it('Read data from mongo as Streams for new user', () => {
    //     request(app)
    //         .get(`api/v1/notes/streams?userId=${config.userID_1}`)
    //         .set('Authorization', `Bearer ${token}`)
    //         .expect(200)
    //         .then((response) => {
    //             expect(response.body).to.have.property('message');
    //             expect(response.body).to.have.property('data');
    //             expect(response.body.data).to.be.an('array');
    //             expect(response.body.data).to.be.empty;
    //             done();
    //         });
    // });
})
