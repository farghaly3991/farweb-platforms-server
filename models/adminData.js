const mongoose = require('mongoose');

const adminData = new mongoose.Schema({
  admin: {
    type: Number,
    default: 1,
  },
  instructions: {
    type: String,
    default: ''
  },
  siteName: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  career: {
    type: String,
    default: ''
  },
  facebook: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  whatsapp: {
    type: String,
    default: ''
  },
  telegram: {
    type: String,
    default: ''
  },
  youtubeSecret: {
    type: String,
    default: ''
  },
  cashNumber: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'arabic'
  },
  nextExamInstructions: {
    type: String,
    default: ''
  },
  payMethod: {
    type: String,
  },
  image1: {
    type: String,
    default: ''
  },
  ad: {
    type: String,
    default: ''
  },
  // image2: {
  //   type: String,
  //   default: ''
  // },
  // image3: {
  //   type: String,
  //   default: ''
  // },
  showStudentsCount: {
    type: Boolean,
    default: true
  },
  activateStudentOneRegistration: {
    type: Boolean,
    default: false,
  },
  deactiveStudentConfirmation: {
    type: Boolean,
    default: true,
  },
  watermark: {
    type: Boolean,
    default: false,
  },
  lessonCodes: {
    type: Boolean,
    default: false,
  },
  randomQuestions: {
    type: Boolean,
    default: true,
  },
  renewHost: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('adminData',adminData);