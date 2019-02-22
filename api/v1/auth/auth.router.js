const router = require('express').Router();
const auth = require('./auth')


// api to check is user authenticated or not
router.post('/isAuthenticated', (req, res, next) => {
  try {

    auth.isUserAuthenticatedRouter(req, res).then((response) => {
      res.status(response.status).send(response);
    }).catch((error) => {
      //console.log('Promise rejected with', error);
      res.status(error.status).send(error);
    });

  } catch (err) {
    // console.log(err);
    res.send({ message: 'Failed to complete request' });
  }
});

module.exports = router;