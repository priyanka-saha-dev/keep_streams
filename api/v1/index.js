const router = require('express').Router();
const users = require('./users');
const notes = require('./notes');
const auth = require('./auth');
log.info('inside api/v1/ route.');

//write your routes here
router.use('/users/', users);
router.use('/notes/', notes);
router.use('/auth/', auth);

module.exports = router;