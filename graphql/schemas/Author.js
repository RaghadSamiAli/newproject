import { gql } from 'apollo-server-express';

export default gql`
  # -----------------------------------------------
  # TYPES
  # -----------------------------------------------
  type Author {
    authorid: ID
    authorname: String
    about: String
    picurl: String
    country: String
    bookscount: String
    Books:  [Book]
  }
  # -----------------------------------------------
  # QUERIES
  # -----------------------------------------------
  extend type Query {
    getallAuthers:[Author]
 getAutherbyid(input: AuthoridInput!): Author
 getAutherbypk(authorid:ID):Author
 
  }
  # -----------------------------------------------
  # MUTATIONS
  # -----------------------------------------------
  extend type Mutation {
    FindorCreateAuthor(input: CreateAuthorInput!): Author!
    EditAuthor(input: EditAuthorInput!): Author
    deleteAuthor(input: AuthoridInput!): Boolean!
  }
  # -----------------------------------------------
  # INPUT
  # -----------------------------------------------
  input AuthoridInput{
    authorid: ID!
  }
  input CreateAuthorInput {
    authorname: String!
    about: String
    picurl: String
    country: String
  }
  input EditAuthorInput{
    authorid: ID!
    authorname: String
    about: String
    picurl: String
    country: String
  }
  input deleteAuthorInput{
    authorid: ID! 
  }
`;