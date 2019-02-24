const router = require('express').Router();
const users = require('./users');
const notes = require('./notes');
const auth = require('./auth');

//write your routes here
router.use('/users/', users);
router.use('/notes/', notes);
router.use('/auth/', auth);

router.get('/', (req, res) => {
    res.status(200).send("ok");
});

module.exports = router;