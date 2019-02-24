const notesDao = require('./notes.dao');

const getNotesAsStream = (userId) => {
    return notesDao.readNotesAsStream(userId);
}

const uploadNotes = (userId) => {
    return notesDao.bulkInsert(userId);
};

module.exports = {
    getNotesAsStream,
    uploadNotes
}