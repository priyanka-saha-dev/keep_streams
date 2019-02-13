const dao = require('./user.dao');

const register = (userData) => {
  return dao.register(userData);
};

const login = (userData) => {
  return dao.login(userData);
};

module.exports = {
  register,
  login
};