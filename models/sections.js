const mongoose = require('mongoose');

const sections = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true
    },
    number: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        default: 0
    },
    stage: {
        type: String,
        default: "6"
    },
    image: {
        type: String,
        default: ''
    },
    orderedTasks: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = new mongoose.model('sections', sections);