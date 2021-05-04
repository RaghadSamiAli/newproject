import { gql } from 'apollo-server-express';

export default gql`
  # -----------------------------------------------
  # TYPES
  # -----------------------------------------------
  type Bookreq {
    bookreqid: ID
    userid: ID!
    status: Int
    booktitle: String!
    bookauther: String!
    User: User
  }
  # -----------------------------------------------
  # QUERIES
  # -----------------------------------------------
  extend type Query {
 getBookreqs:[Bookreq]
 getBookreqbyid(bookreqid:ID!):Bookreq!
 getBookreqByUser(userid:ID!):[Bookreq]
  }
  # -----------------------------------------------
  # MUTATIONS
  # -----------------------------------------------
  extend type Mutation {
    createBookReq(input: createBookReqInput!): Bookreq!
    EditBookReq(input: EditBookReqInput!): Bookreq!
    deleteBookReq(bookreqid:ID!): Boolean!
    approveBookReq(bookreqid:ID!): Boolean!
  }
  # -----------------------------------------------
  # INPUT
  # -----------------------------------------------
input createBookReqInput{
  userid: ID
    status: Int
    booktitle: String!
    bookauther: String!
}
input EditBookReqInput{
  bookreqid:ID!
  status: Int
    booktitle: String
    bookauther: String
}
`;