const router = require('express').Router();
const controller = require('./user.controller');

router.post('/login', (req, res, next) => {
  controller.login(req.body).then((response) => {
    //console.log('Promise resolved');
    res.status(response.status).send(response);
    
  }).catch((error) => {
    //console.log('Promise rejected with', error);
    res.status(error.status).send(error);

  });
});

router.post('/register', (req, res, next) => {

  //console.log("Register user with", req.body);

  controller.register(req.body).then((response) => {
    //console.log('Promise resolved', response);
    res.status(response.status).send(response);
    
  }).catch((error) => {
    //console.log('Promise rejected with', error);
    res.status(error.status).send(error);

  });
});

router.get('/', (req, res, next) => {
  res.send('Users API');
})

module.exports = router;