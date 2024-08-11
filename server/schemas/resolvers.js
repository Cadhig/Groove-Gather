 const { AuthenticationError } = require('apollo-server-errors');
const { User, Class, Teacher} = require('../models');
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
    searchTeachers: async (parent, { keyword }) => {
      if (!keyword) {
        return [];
      }
      const regex = new RegExp(keyword, 'i');
      return Teacher.find({
        $or: [
          { name: regex },
          { grooves: regex },
        ],
      })
    },
    teachers: async () => {
      return Teacher.find().populate('classes');
    },
    teacher: async (parent, { id }) => {
      return Teacher.findById(id).populate('classes');
    },
    classes: async () => {
      const result =  Class.find().populate('instructor');
      console.log (result);
      return result;
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
    addTeacher: async (parent, { name, nextFestival, bio, danceStyles, experience,}) => {
      const teacher = new Teacher({ name, nextFestival, bio, danceStyles, experience, });
      return teacher.save();
    },
    updateTeacher: async (parent, { id, name, nextFestival, bio, danceStyles, experience, }) => {
      return Teacher.findByIdAndUpdate(id, { name, nextFestival, bio, danceStyles, experience, }, { new: true });
    },
    removeTeacher: async (parent, { id }) => {
      return Teacher.findByIdAndDelete(id);
    },
    addClass: async (parent, { name, danceStyles, instructor, schedule, duration, location }) => {
      const newClass = new Class({ name, dance, instructor, schedule, duration, location });
      return newClass.save();
    },
    updateClass: async (parent, { id, name, danceStyles, instructor, schedule, duration, location }) => {
      return Class.findByIdAndUpdate(id, { name, danceStyles, instructor, schedule, duration, location }, { new: true });
    },
    removeClass: async (parent, { id }) => {
      return Class.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;
