import { gql } from 'apollo-server-express';

export default gql`
  # -----------------------------------------------
  # TYPES
  # -----------------------------------------------
  type Order {
    orderid: ID
    userid: ID!
    booksispn: [Book]!
    shippingid: Shippingadd!
    status: Int!
    productscosts: Int! 
    shippingcost: Int!
    totalprice:Int
  }
  # -----------------------------------------------
  # QUERIES
  # -----------------------------------------------
  extend type Query {
   getallOrders: [Order]!
   getMyOrders(userid:ID!):[Order]!
  }
  # -----------------------------------------------
  # MUTATIONS
  # -----------------------------------------------
  extend type Mutation {
    createorder(input: CreateorderInput!): Order!
    createorderByAdmin(input: CreateorderByAdminInput!): Order!
    deleteorderByID(orderid:ID!): Boolean!
    editorderByAdmin(input:EditOrderByAdminInput!): Boolean!
    editmyorder(input:EditMyorderInput!): Boolean!
  }
  # -----------------------------------------------
  # INPUT
  # -----------------------------------------------
  input CreateorderByAdminInput{
    orderid: ID
    userid: ID!
    booksispn: [ID]!
    shippingid: ID!
    status: Int!
    productscosts: Int! 
    shippingcost: Int!
    totalprice:Int
  }
  input CreateorderInput{
    orderid: ID
    userid: ID!
    booksispn: [ID]!
    shippingid: ID!
    status: Int!
    productscosts: Int! 
    shippingcost: Int!
    totalprice:Int
  }
  input EditOrderByAdminInput{
    orderid: ID!
    userid: ID
    booksispn: [ID]
    shippingid: ID
    status: Int
    productscosts: Int
    shippingcost: Int
    totalprice:Int
  }
  input EditMyorderInput{
    orderid: ID!
    userid: ID!
    booksispn: [ID]
    shippingid: ID
    productscosts: Int
    shippingcost: Int
    totalprice:Int
  }
`;