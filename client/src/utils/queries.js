import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const GET_TEACHERS = gql`
  query GetTeachers {
    teachers {
      _id
      name
    }
  }
`;

export const GET_TEACHER_BY_ID = gql`
  query GetTeacherById($id: ID!) {
    teacher(id: $id) {
      _id
      name
      genre
    }
  }
`;

// Queries related to users
export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      username
      email
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      _id
      username
      email
    }
  }
`;
export const GET_CLASSES = gql`
  query GetClasses {
    classes {
      _id
      name
      schedule {
        day
        time
      }
    }
  }
`;
