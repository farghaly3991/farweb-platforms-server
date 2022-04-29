const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    stage: {
        type: String,
        required: true
    },
    confirmed: {
        type: Number,
        required: true,
        default: 0
    },
    
    admin: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true
    },
    parentPhone: {
        type: String,
        // required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true,
        default: 0
    },
    registered: {
        type: Boolean,
        default: false
    },
    lastTime: {
        type: Number,
        defualt: 0
    },
    units: Array,
    lastSeen: Number,
    lastSeenAdmin: Number,
});

module.exports = new mongoose.model('users', usersSchema);