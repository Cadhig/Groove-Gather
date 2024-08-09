const { Schema, model } = require('mongoose');

const videoSchema = new Schema({
  videoId: { 
    type: String,
    required: true,
    unique: true 
  },
  authors: [String],
  description: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
  genre: [String],
  duration: {
    type: String,
  },
}, {
  toJSON: {
    virtuals: true,
  },
  id: false
});

const Video = model('Video', videoSchema);

module.exports = Video;
