import { gql } from 'apollo-server-express';

export default gql`
  # -----------------------------------------------
  # TYPES
  # -----------------------------------------------

  type Item {
    itemid: ID
    orderid: ID!
    userid: ID!
    isbn: ID!
    title: String 
    picurl: String
    price: Int!
    status: Int
    User: User
    Order: Order
    Book: Book
  }

  
  # -----------------------------------------------
  # QUERIES
  # -----------------------------------------------
  extend type Query {
    getallItems: [Item]
   getItembyispn: Item
   getItemsbyAuthor(input: deleteAuthorInput!):[Item]
   ItemsIordered:[Item]
   ItemspriceIstimator(isbn:[ID]!):String!
   getItembypk(isbn:ID!):Item
   getItemsbyAuthorid(authorid:ID!):[Item]
  }
  # -----------------------------------------------
  # MUTATIONS
  # -----------------------------------------------
  extend type Mutation {
    FindorCreateItem(input: createItemInput!): Item!
    EditItem(input: EditItemInput!): Item!
    deleteItem(input: isbnInput!): Boolean!
  }
  # -----------------------------------------------
  # INPUT
  # -----------------------------------------------
  input createItemInput {
    isbn: ID!
    title: String!
    authorid: ID!
    publishedate: String
    edition: String
    picurl: String 
    language: String!
    discribtion: String
    price: String!
    localprice: String
    tag: String
    categoryid: ID
  }
  input EditItemInput{
    isbn: ID!
    title: String
    authorid: ID!
    publishedate: String
    edition: String
    picurl: String 
    language: String
    discribtion: String
    price: String
    localprice: String
    tag: String
    categoryid: ID
  }

`;