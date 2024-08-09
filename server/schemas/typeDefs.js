const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedVideos: [Video]
    videoCount: Int
    firstName: String!
    lastName: String
    bio: String
  }

  type Video {
    _id: ID!
    videoId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String!
    genre: [String]
    duration: String!
  }

  input VideoInput {
    videoId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String!
    genre: [String]
    duration: String!
  }

  type Class {
    _id: ID!
    name: String!
    instructor: Teacher!
    schedule: Schedule!
    location: String
  }

  input ClassInput {
    name: String!
    instructor: ID!
    schedule: ScheduleInput!
    duration: String!
    location: String
  }

  type Schedule {
    day: String!
    time: String!
  }

  input ScheduleInput {
    day: String!
    time: String!
  }

  type Teacher {
    _id: ID!
    name: String!
    dancestyles: [String!]
    classes: [Class]
  }

  type Query {
    me: User
    user(id: ID!): User
    teachers: [Teacher]
    teacher(id: ID!): Teacher
    classes: [Class]
    class(id: ID!): Class
    videos: [Video]
    video(id: ID!): Video
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUserProfile(firstName: String!, lastName: String, bio: String): User
    
    addVideo(videoData: VideoInput!): Video
    updateVideo(id: ID!, videoData: VideoInput!): Video
    removeVideo(id: ID!): Video

    addTeacher(name: String!, genre: String!, email: String!): Teacher
    updateTeacher(id: ID!, name: String, dancestyles: [String], email: String): Teacher
    removeTeacher(id: ID!): Teacher
    
    addClass(name: String!, genre: String!, instructor: ID!, schedule: ScheduleInput!, duration: String!, location: String): Class
    updateClass(id: ID!, name: String, dancestyles: String, instructor: ID, schedule: ScheduleInput, duration: String, location: String): Class
    removeClass(id: ID!): Class
  }
`;

module.exports = typeDefs;
