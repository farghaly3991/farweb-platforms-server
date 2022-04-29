const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
    examId: String,
    userId: String,
    stage: String,
    year: Number,
    unit: String,
    name: String,
    number: Number,

    sections: Object,
    inTime: {
        type: Boolean,
        default: true
    },
    totalDegree: {
        type: Number,
        default: 0
    },
    fullDegree: {
        type: Number,
        default: 0
    },
    done: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('unit_solutions', solutionSchema);
