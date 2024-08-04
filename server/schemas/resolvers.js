const Teacher = require('../models/Teachers');
const Class = require('../models/Class');

const resolvers = {
  Query: {
    teachers: async () => {
      return Teacher.find().populate('classes');
    },
    teacher: async (parent, { id }) => {
      return Teacher.findById(id).populate('classes');
    },
    classes: async () => {
      return Class.find().populate('instructor');
    },
    class: async (parent, { id }) => {
      return Class.findById(id).populate('instructor');
    },
  },

  Mutation: {
    addTeacher: async (parent, { name, nextFestival, bio, danceStyles, experience, contactInfo }) => {
      const teacher = new Teacher({ name, nextFestival, bio, danceStyles, experience, contactInfo });
      return teacher.save();
    },
    updateTeacher: async (parent, { id, name, nextFestival, bio, danceStyles, experience, contactInfo }) => {
      return Teacher.findByIdAndUpdate(id, { name, nextFestival, bio, danceStyles, experience, contactInfo }, { new: true });
    },
    removeTeacher: async (parent, { id }) => {
      return Teacher.findByIdAndDelete(id);
    },
    addClass: async (parent, { name, genre, instructor, schedule, duration, location }) => {
      const newClass = new Class({ name, genre, instructor, schedule, duration, location });
      return newClass.save();
    },
    updateClass: async (parent, { id, name, genre, instructor, schedule, duration, location }) => {
      return Class.findByIdAndUpdate(id, { name, genre, instructor, schedule, duration, location }, { new: true });
    },
    removeClass: async (parent, { id }) => {
      return Class.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;
