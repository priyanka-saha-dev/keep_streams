const router = require('express').Router();
const notes = require('./notes');

//console.log('inside api/v1/ route.');

//write your routes here
router.use('/notes/', notes);

module.exports = router;
