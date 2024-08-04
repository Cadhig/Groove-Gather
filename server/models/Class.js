const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },         
  instructor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Teacher', 
    required: true 
  },                                            
  schedule: {
    day: { type: String, required: true },     
    time: { type: String, required: true }    
  },
  duration: { type: String, required: true },  
  location: { type: String }                   
}, { timestamps: true });                      

module.exports = mongoose.model('Class', classSchema);
