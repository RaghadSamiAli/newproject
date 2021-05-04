import { gql } from 'apollo-server-express';

export default gql`
  # -----------------------------------------------
  # TYPES
  # -----------------------------------------------
  type Language {
    langid: ID
    local: String!
    name: String
    dir:String!
  }
  # -----------------------------------------------
  # QUERIES
  # -----------------------------------------------
  extend type Query {
   getLanguagebylangid(langid:ID!): Language!
   getLanguagebylocal(langid:String!):Language!
  }
  # -----------------------------------------------
  # MUTATIONS
  # -----------------------------------------------
  extend type Mutation {
    createLanguage(input: createLanguageInput!): Language!
    EditLanguage(input: EditLanguageInput!): Boolean!
    deleteLanguagebyid(langid:ID!): Boolean!
    deleteLanguagebylocal(local:String!): Boolean!
  }
  # -----------------------------------------------
  # INPUT
  # -----------------------------------------------
  input createLanguageInput{
    local: String!
    name: String
    dir:String!
  }
  input EditLanguageInput{
    langid: ID!
    local: String
    name: String
    dir:String
  }
`;