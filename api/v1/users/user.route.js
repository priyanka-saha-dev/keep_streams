const router = require('express').Router();
const controller = require('./user.controller');

router.post('/login', (req, res, next) => {
  controller.login(req.body).then((response) => {
    res.status(response.status).send(response);
    
  }).catch((error) => {
    res.status(error.status).send(error);

  });
});

router.post('/register', (req, res, next) => {

  controller.register(req.body).then((response) => {
    res.status(response.status).send(response);
    
  }).catch((error) => {
    res.status(error.status).send(error);

  });
});

router.get('/', (req, res, next) => {
  res.send('Users API');
})

module.exports = router;