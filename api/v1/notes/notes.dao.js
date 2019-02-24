let noteModel = require('./notes.entity');
const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');
const streamToMongo = require('stream-to-mongo-db');
const { dbConfig } = require('../../../config').appConfig;
const { Transform } = require('stream');
const uuidv1 = require('uuid/v1');

const readNotesAsStream = (userId) => {
    return new Promise((resolve, reject) => {

        try {
            const query = {
                userId: userId
            };
            let output = [];
            
            noteModel
                .find(query)
                .lean()
                .cursor()
                .pipe(JSONStream.stringify())
                .pipe(JSONStream.parse('*'))
                .on('data', (data) => output.push(data))
                .on('end', () => {
                    resolve({
                        message: `Notes found - count = ${output.length}`,
                        data: output,
                        status: 200
                    });

                }).on('error', (error) => {
                    reject({
                        message: error.message,
                        status: 500
                    });
                });


        } catch (err) {
            reject({
                message: 'Notes NOT found',
                status: 500
            })
        }
    });
};

const transformNoteModel = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform(chunk, encoding, callback) {


        chunk = new noteModel({
            id: uuidv1(),
            title: chunk.title,
            text: chunk.text,
            userId: chunk.userId
        });

        this.push(chunk);

        callback();
    }
});

const bulkInsert = (userId) => {
    return new Promise((resolve, reject) => {

        try {
            // where the data will end up
            const outputDBConfig = { dbURL: dbConfig.mongoUrl, collection: dbConfig.noteCollection };

            // create the writable stream
            const writableStream = streamToMongo.streamToMongoDB(outputDBConfig);

            // create readable stream and consume it
            const mock_notes = path.resolve(__dirname, '../../../mock_notes.json');

            fs.createReadStream(mock_notes, 'utf8')
                .pipe(JSONStream.parse('*'))
                .on('data', (data) => data.userId = userId)
                .pipe(transformNoteModel)
                .pipe(writableStream)
                .on('finish', () => {
                    resolve({
                        message: 'Notes inserted',
                        status: 201
                    });
                }).on('error', (error) => {
                    reject({
                        message: error.message,
                        status: 500
                    });
                });

        } catch (err) {
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
