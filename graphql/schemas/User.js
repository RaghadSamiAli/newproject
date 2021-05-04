import { gql } from 'apollo-server-express';

export default gql`
  # -----------------------------------------------
  # TYPES
  # -----------------------------------------------
  type User {
    userid: ID
    fullname: String
    phone: String!
    fname: String!
    lname: String!
    email: String 
    role: Int
    Profile: Profile
    Orders: [Order]
    Items: [Item]
    Notifications: [Notification]
    Bookreqs: [Bookreq]
  }
  # -----------------------------------------------
  # QUERIES
  # -----------------------------------------------
  extend type Query {
    me: User
    users: [User!]
    isLoggedIn: Boolean!
  }
  # -----------------------------------------------
  # MUTATIONS
  # -----------------------------------------------
  extend type Mutation {
    createUser(input: CreateUserInput!): User!
    login(input: LoginInput!): User!
    logout: User!
    deleteUser(input: deleteUserInput!): User!
    updatemyuser(input: UpdateUserInput!): User!
  }
  # -----------------------------------------------
  # INPUT
  # -----------------------------------------------
  input CreateUserInput {
    phone: String!
    fname: String!
    lname: String!
    password: String!
    email: String
  }
  input UpdateUserInput{
    phone: String
    fname: String
    lname: String
    password: String
    email: String
  }
  input LoginInput{
    phone: String!
    password: String!
  }
  input deleteUserInput{
    userid: ID! 
    phone: String!
  }
`;