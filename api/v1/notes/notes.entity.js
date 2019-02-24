const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: 'not-started'
    },
    userId: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    modifiedOn: {
        type: Date,
        default: Date.now()
    }
});

NoteSchema.methods.findByUserIdStream = function () {
    return this.model('note')
        .find({
            $or: [
                { userId: this.userId },
                { collaborators: { $elemMatch: { userId: this.userId } } }
            ]
        })
        .lean().stream();
};

module.exports = mongoose.model('note', NoteSchema);
