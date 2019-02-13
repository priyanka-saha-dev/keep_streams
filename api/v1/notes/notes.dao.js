let noteModel = require('./notes.entity');
const fs = require('fs');
const JSONStream = require('JSONStream');
const { streamToMongoDB } = require('stream-to-mongo-db');
const { dbConfig } = require('../../../config').appConfig;

const log = require('../../../logger');

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

const bulkInsert = (userId) => {
    return new Promise((resolve, reject) => {

        log.info('inserting notes in db');

        // where the data will end up
        const outputDBConfig = { dbURL: dbConfig.mongoUrl, collection: dbConfig.noteCollection };

        // create the writable stream
        const writableStream = streamToMongoDB(outputDBConfig);

        // create readable stream and consume it
        const mock_notes = path.resolve(__dirname, '../../../mock_notes.json');
        fs.createReadStream(mock_notes, 'utf8')
            .pipe(JSONStream.parse('*'))
            .pipe(writableStream);

        req.on('end', () => {
            res.status(200).send({
                message : 'Notes inserted'
            })
        
        });
        // notes = notes.map(n => {
        //     let note = n;
        //     note.id = uuidv1();
        //     note.userId = userId;
        //     note.state = 'not-started';
        //     return note;
        // });
        // log.debug(notes);

        // noteModel.insertMany(notes, (err, insertedNotes) => {
        //     if (err) throw err;
        //     resolve({ notes: insertedNotes });
        // });

    });
}


module.exports = {
    readNotesAsStream,
    bulkInsert
}
