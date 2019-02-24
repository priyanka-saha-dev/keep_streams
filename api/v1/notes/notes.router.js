const router = require('express').Router();
//const multer  = require('multer');
const notesController = require('./notes.controller');
//const storage = multer.memoryStorage();
//const upload = multer({ storage: storage });
const auth = require('../auth/auth');

router.use(auth.isUserAuthenticated);

router.get('/', (req, res) => {
    res.status(200).send("Get Notes All");
});

router.get('/stream', notesController.getNotesAsStream);
//router.post('/stream', upload.single('notes'), notesController.uploadNotes);
router.post('/stream', notesController.uploadNotes);

module.exports = router;
