const notesDao = require('./notes.dao');

const getNotesAsStream = (res, userId) => {
    notesDao.readNotesAsStream(userId)
        .then((result) => {
            res.set('Content-Type', 'application/json');
            result.pipe(res);
        })
        .catch((error) => {
            res.status(error.status).json(error);
        });
}

const uploadNotes = (userId) => {
    return notesDao.bulkInsert(userId);
};

module.exports = {
    getNotesAsStream,
    uploadNotes
}