const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: String,
    year: Number,
    stage: String,
    unit: String,
    number: Number,
    deadLine: Date,
    timer: Number,
    sections: [],
    fullDegree: Number,
    publishDate: String,
    pdf: String,
});


module.exports = mongoose.model('unit_exams', examSchema);
