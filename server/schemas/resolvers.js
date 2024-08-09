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
    video: async (parent, { id }) => {
      return Video.findById(id);
    },
    videos: async () => {
      return Video.find();
    },
    videoByVideoId: async (parent, { videoId }) => {
      return Video.findOne({ videoId });
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
<<<<<<< HEAD
    addVideo: async (parent, { videoData }, context) => {
      if (context.user) {
        const video = await Video.create(videoData);
        return video;
      }
      throw new AuthenticationError('Not logged in');
    },
    updateVideo: async (parent, { Id, videoData }, context) => {
      if (context.user) {
        return Video.findByIdAndUpdate(Id, videoData, { new: true });
      }
      throw new AuthenticationError('Not logged in');
    },
    removeVideo: async (parent, { videoId }, context) => {
      if (context.user) {
        const video = await Video.findOneAndDelete({
          _id: videoId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { videos: video._id } }
        );

        return video;
      }
      throw new AuthenticationError('Not logged in');
    },
    addTeacher: async (parent, { name, nextFestival, bio, danceStyles, experience, contactInfo }) => {
      const teacher = new Teacher({ name, nextFestival, bio, danceStyles, experience, contactInfo });
=======
    addTeacher: async (parent, { name, nextFestival, bio, danceStyles, experience,}) => {
      const teacher = new Teacher({ name, nextFestival, bio, danceStyles, experience, });
>>>>>>> 4fe079528ee9eb1c2ad99e7a5e17b9b6b5a47f3d
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
