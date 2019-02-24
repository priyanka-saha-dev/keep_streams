const notesService = require('./notes.service');

const getNotesAsStream = (req, res) => {
    try {
        const userId = req.query.userId;
        notesService.getNotesAsStream(userId)
            .then((result) => {
                res.status(result.status).json(result);
            }).catch((error) => {
                res.status(error.status).json(error);
            });
    } catch (err) {
        res.status(500).json('Something went wrong. Error: ' + err.message);
    }



};

const uploadNotes = (req, res) => {
    try {
        const userId = req.query.userId;
        notesService.uploadNotes(userId)
            .then((result) => {
                res.status(result.status).json(result);
            })
            .catch((error) => {
                res.status(error.status).json(error);
            });
    } catch (err) {
        res.status(500).json('Something went wrong. Error: ' + err.message);
    }
};


module.exports = {
    getNotesAsStream,
    uploadNotes
}
