const User = require('./user.entity');
const uuidv1 = require('uuid/v1');
const auth = require('../auth/auth');
const { authConfig } = require('../../../config').appConfig;

const login = (info) => {
  return new Promise((resolve, reject) => {
    const query = {
      username : info.username
    };

    User.findOne(query, (error, doc) => {

      if (error) {
        reject({
          message: 'Login Failed.',
          status: 500
        });
      } else if(!doc) {
        reject({
          message: 'You are not registered user',
          status: 403
        });
      } else if(doc.password !== info.password) {
        reject({
          message: 'Passwords is incorrect',
          status: 403
        });
      } else {

        let payload = {
          userName : doc.username,
          userId : doc.userId
        }

        auth.signToken(payload, authConfig.jwtSecret, '10h', (err, token) => {
          if(err) {
            reject({
              message: 'Passwords is incorrect',
              status: 403
            });
          } else {
            resolve({
              token : token,
              user : payload,
              status : 200
            });
          }
        })

      }
    });
  });
};

const register = (info) => {
  
  return new Promise((resolve, reject) => {
    let user = new User(info);

    user.userId = uuidv1();

    user.save((error, doc) => {
      if (error) {
        if(error.message.includes('duplicate')) {
          reject({
            message: 'username is already exist',
            status: 403
          });
        } else {
          reject({
            message: 'Registration Failed.',
            status: 500
          });
        }

      } else {
        let user = {
          userInfo: doc.username
        }
        resolve({
          message: 'Registration Success.',
          status: 201,
          //userInfo: doc.username
          user : user
        });
      }
    });
  });
};

module.exports = {
  login,
  register
};