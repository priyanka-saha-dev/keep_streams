const svc = require('./user.service');

const register = (userData) => {
  return svc.register(userData);
};

const login = (userData) => {
  return svc.login(userData);
};

module.exports = {
  register,
  login
};