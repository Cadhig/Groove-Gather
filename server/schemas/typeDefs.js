const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Teacher {
    _id: ID!
    name: String!
    genre: String!
    email: String!
    classes: [Class] # Reference to Class type if you have a Class model
  }

  type Query {
    teachers: [Teacher]
    teacher(id: ID!): Teacher
  }

  type Mutation {
    addTeacher(name: String!, genre: String!, email: String!): Teacher
  }
`;

module.exports = typeDefs;
