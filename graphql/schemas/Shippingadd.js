import { gql } from 'apollo-server-express';

export default gql`
  # -----------------------------------------------
  # TYPES
  # -----------------------------------------------
  type Shippingadd {
    shippingid: ID
    title: String! 
    point: String
    price: Int
  }
  # -----------------------------------------------
  # QUERIES
  # -----------------------------------------------
  extend type Query {
   getallShippingadd: [Shippingadd]!
   getsheppingdis(shippingid:ID!): String
   getShippingprice:String!
  }
  # -----------------------------------------------
  # MUTATIONS
  # -----------------------------------------------
  extend type Mutation {
    createShippingadd(input: CreateShippingInput!): Shippingadd!
    
    EditShippingadd(input: EditShippingInput!): Boolean!
    deleteShippingaddByID(shippingid:ID!): Boolean!
  }
  # -----------------------------------------------
  # INPUT
  # -----------------------------------------------
 input CreateShippingInput{
    shippingid: ID
    title: String! 
    point: String
    price: Int
 }
input EditShippingInput{
  shippingid: ID!
    title: String
    point: String
    price: Int
}
`;