const Teacher = require('./models/Teachers');

const resolvers = {
  Query: {
    teachers: async () => {
      return await Teacher.find();
    },
    teacher: async (_, { id }) => {
      return await Teacher.findById(id);
    },
  },
  Mutation: {
    addTeacher: async (_, { name, genre, email }) => {
      const teacher = new Teacher({ name, genre, email });
      await teacher.save();
      return teacher;
    },
  },
};

module.exports = resolvers;
