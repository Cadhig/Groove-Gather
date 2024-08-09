const { AuthenticationError } = require('apollo-server-errors');
const { User, Video, Class, Teacher} = require('../models');
 const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new AuthenticationError('Not logged in');
    },
    user: async (parent, { id }) => {
      return User.findById(id);
    },
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
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }

        const correctPW = await user.isCorrectPassword(password);

        if(!correctPW) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);
        return { token, user };
    },
    updateUserProfile: async (parent, { firstName, lastName, bio }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { firstName, lastName, bio },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('Not logged in');
    },
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
