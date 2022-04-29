const mongoose = require('mongoose');

const videosSchema = new mongoose.Schema({
    section: {
        type: Number,
        required: true,
    },
    paid: {
        type: Boolean,
        default: false,
    },
    number: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    stage: {
        type: String,
        required: true,
    },
    explain: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        unique: true
    },
    showDate: {
        type: String,
        required: true,
    },
    videoPath: {
        type: String,
        // required: true,
    },
    filePath: {
        type: String,
    },
    students: [],
    codes: [{
        userId: String,
        code: String,
        times: Number,
    }]
});
module.exports = new mongoose.model('lessons', videosSchema);