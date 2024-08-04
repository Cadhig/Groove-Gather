const typeDefs = `
  type Class {
    _id: ID!
    name: String!
    genre: String!
    instructor: Teacher!
    schedule: Schedule!
    duration: String!
    location: String
  }

  type Schedule {
    day: String!
    time: String!
  }

  type Teacher {
    _id: ID!
    name: String!
    genre: String!
    email: String!
    classes: [Class]
  }

  type Query {
    teachers: [Teacher]
    teacher(id: ID!): Teacher
    classes: [Class]
    class(id: ID!): Class
  }

  type Mutation {
    addTeacher(name: String!, genre: String!, email: String!): Teacher
    updateTeacher(id: ID!, name: String, genre: String, email: String): Teacher
    removeTeacher(id: ID!): Teacher
    
    addClass(name: String!, genre: String!, instructor: ID!, schedule: ScheduleInput!, duration: String!, location: String): Class
    updateClass(id: ID!, name: String, genre: String, instructor: ID, schedule: ScheduleInput, duration: String, location: String): Class
    removeClass(id: ID!): Class
  }

  input ScheduleInput {
    day: String!
    time: String!
  }
`;

module.exports = typeDefs;
