const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nextFestival:{type:String, required: true },
  bio: { type: String },
  danceStyles: [{ type: String }], 
  experience: { type: Number },    
  contactInfo: {
    phone: { type: String },
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
