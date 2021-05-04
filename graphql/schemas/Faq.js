import { gql } from 'apollo-server-express';

export default gql`
  # -----------------------------------------------
  # TYPES
  # -----------------------------------------------
  type Faq {
    faqid: ID
    question: String!
    answer: String!
  }
  # -----------------------------------------------
  # QUERIES
  # -----------------------------------------------
  extend type Query {
 getFaqs: [Faq]
 getFaqById(faqid:ID!):Faq!
  }
  
  # -----------------------------------------------
  # MUTATIONS
  # -----------------------------------------------
  extend type Mutation {
    createFaq(input: createFaqInput!): Faq!
    EditFaq(input: EditFaqInput!): Faq
    deleteFaq(faqid:ID!): Boolean!
  }
  # -----------------------------------------------
  # INPUT
  # -----------------------------------------------
input createFaqInput{
  question: String!
    answer: String!
}
input EditFaqInput{
    faqid: ID!
    question: String
    answer: String
}
`;