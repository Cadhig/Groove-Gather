const typeDefs = `
  type Teacher {
    _id: ID!
    name: String!
    nextFestival: String!
    bio: String
    danceStyles: [String]
    experience: Int
    contactInfo: ContactInfo
  }

  type ContactInfo {
    phone: String
  }

  type Query {
    teachers: [Teacher]
    teacher(id: ID!): Teacher
  }

  type Mutation {
    addTeacher(
      name: String!,
      nextFestival: String!,
      bio: String,
      danceStyles: [String],
      experience: Int,
      phone: String
    ): Teacher
  }
`;

module.exports = typeDefs;
