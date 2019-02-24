const router = require('express').Router();
const auth = require('./auth')
const log = require('../../../../logger');

// api to check is user authenticated or not
router.post('/isAuthenticated', (req, res, next) => {
  try {

    auth.isUserAuthenticatedRouter(req, res).then((response) => {
      res.status(response.status).send(response);
    }).catch((error) => {
      log.info('Promise rejected with', error);
      res.status(error.status).send(error);
    });

  } catch (err) {
    log.info(err);
    res.send({ message: 'Failed to complete request' });
  }
});

module.exports = router;