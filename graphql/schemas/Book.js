import { gql } from 'apollo-server-express';

export default gql`
  # -----------------------------------------------
  # TYPES
  # -----------------------------------------------

  type Book {
    isbn: ID!
    title: String!
    publishedate: String
    edition: String
    picurl: String 
    authorid: ID!
    language: String!
    discribtion: String
    price: String!
    localprice: String
    tag: String
    buycount:String
    viewcount:String
    categoryid: ID
   Category: Category 
    Author: Author
  }

  
  # -----------------------------------------------
  # QUERIES
  # -----------------------------------------------
  extend type Query {
    getallbooks: [Book!]
   getBooksbyAuthor(input: deleteAuthorInput!):[Book]
   BooksIordered:[Book]
   bookspriceIstimator(isbn:[ID]!):String!
   getBookbypk(isbn:ID!):Book
   getBooksbyAuthorid(authorid:ID!):[Book]
  }
  # -----------------------------------------------
  # MUTATIONS
  # -----------------------------------------------
  extend type Mutation {
    FindorCreateBook(input: createBookInput!): Book!
    EditBook(input: EditBookInput!): Book!
    deleteBook(input: isbnInput!): Boolean!
  }
  # -----------------------------------------------
  # INPUT
  # -----------------------------------------------
  input createBookInput {
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
  input EditBookInput{
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
input isbnInput{
  isbn: ID!
}
`;