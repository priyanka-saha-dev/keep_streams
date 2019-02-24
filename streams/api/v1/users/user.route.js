const router = require('express').Router();
const controller = require('./user.controller');
const log = require('../../../../logger');

router.post('/login', (req, res, next) => {
  controller.login(req.body).then((response) => {
    log.info('Promise resolved');
    res.status(response.status).send(response);
    
  }).catch((error) => {
    log.info('Promise rejected with', error);
    res.status(error.status).send(error);

  });
});

router.post('/register', (req, res, next) => {

  log.info("Register user with", req.body);

  controller.register(req.body).then((response) => {
    log.info('Promise resolved', response);
    res.status(response.status).send(response);
    
  }).catch((error) => {
    log.info('Promise rejected with', error);
    res.status(error.status).send(error);

  });
});

router.get('/', (req, res, next) => {
  res.send('Users API');
})

module.exports = router;