let noteModel = require('./notes.entity');
const uuidv1 = require('uuid/v1');
const JSONStream = require('JSONStream');

const log = require('../../../logging');

const readNotesAsStream = (userId) => {
    return new Promise((resolve, reject) => {

        const note = new noteModel({
            userId: userId
        });
        log.info('getting notes as stream');
        const notesStream = note.findByUserIdStream();

        resolve(notesStream.pipe(JSONStream.stringify()));

    });
}

const bulkInsert = (userId, notes) => {
    return new Promise((resolve, reject) => {

        log.info('inserting notes in db');

        notes = notes.map(n => {
            let note = n;
            note.id = uuidv1();
            note.userId = userId;
            note.state = 'not-started';
            return note;
        });
        log.debug(notes);
        
        noteModel.insertMany(notes, (err, insertedNotes) => {
            if (err) throw err;
            resolve({ notes: insertedNotes });
        });

    });
}


module.exports = {
    readNotesAsStream,
    bulkInsert
}
