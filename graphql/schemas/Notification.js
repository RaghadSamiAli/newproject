import { gql } from 'apollo-server-express';

export default gql`
  # -----------------------------------------------
  # TYPES
  # -----------------------------------------------
  type Notification {
    userid: ID
    fullname: String
    phone: String!
    fname: String!
    lname: String!
    email: String 
    Role: Int

  }
  # -----------------------------------------------
  # QUERIES
  # -----------------------------------------------

  # -----------------------------------------------
  # MUTATIONS
  # -----------------------------------------------

  # -----------------------------------------------
  # INPUT
  # -----------------------------------------------

`;