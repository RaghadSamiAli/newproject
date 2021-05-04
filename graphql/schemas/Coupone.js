import { gql } from 'apollo-server-express';

export default gql`
  # -----------------------------------------------
  # TYPES
  # -----------------------------------------------
  type Coupone {
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
  extend type Query {
 getCoupones: [Coupone]!
  }
  # -----------------------------------------------
  # MUTATIONS
  # -----------------------------------------------

  # -----------------------------------------------
  # INPUT
  # -----------------------------------------------

`;