const router = require('express').Router();
const notes = require('./notes');
const users = require('./users');

//console.log('inside api/v1/ route.');

//write your routes here
router.use('/notes/', notes);
router.use('/users/', users);

module.exports = router;
