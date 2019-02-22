let noteModel = require('./notes.entity');
const fs = require('fs');
const path = require('path');
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

        try {
            // where the data will end up
            const outputDBConfig = { dbURL: dbConfig.mongoUrl, collection: dbConfig.noteCollection };

            // create the writable stream
            const writableStream = streamToMongoDB(outputDBConfig);

            // create readable stream and consume it
            const mock_notes = path.resolve(__dirname, '../../../mock_notes.json');

            console.log('mock notes:', mock_notes);

            fs.createReadStream(mock_notes, 'utf8')
                .pipe(JSONStream.parse('*'))
                .pipe(writableStream);

            resolve({
                message: 'Notes inserted',
                status: 200
            });
            
        } catch (err) {
            console.log('error :', err);
            reject({
                message: 'Notes NOT inserted',
                status: 500
            })
        }


    });
}


module.exports = {
    readNotesAsStream,
    bulkInsert
}
