const mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
    id: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
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
        enum: ['not-started', 'started', 'completed'],
        default: 'not-started'
    },
    userId: {
        type: String,
        required: true
    },
    createdOn: {
        type: String,
        default: Date.now(),
        required: true
    },
    modifiedOn: {
        type: String,
        default: Date.now(),
        required: true
    }
});

noteSchema.methods.findByUserIdStream = function () {
    return this.model('note')
        .find({
            $or: [
                { userId: this.userId },
                { collaborators: { $elemMatch: { userId: this.userId } } }
            ]
        })
        .lean().stream();
};

module.exports = mongoose.model('note', noteSchema);
