const mongoose = require('mongoose'); 

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nextFestival: {
    type: String,
    required: true,
  },
  danceStyles: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  classes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }]
}, {
  toJSON: {
    virtuals: true,
  },
  id: false
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
