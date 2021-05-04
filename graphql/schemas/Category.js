import { gql } from 'apollo-server-express';

export default gql`
  # -----------------------------------------------
  # TYPES
  # -----------------------------------------------
  type Category {
    categoryid: ID
    name: String!
    bannerpic: String

  }
  # -----------------------------------------------
  # QUERIES
  # -----------------------------------------------
  extend type Query {
 getCategories: [Category]
 getCategoryByName(categoryname:String!):Category
 getCategoryById(categoryid:ID!):Category
  }
  # -----------------------------------------------
  # MUTATIONS
  # -----------------------------------------------
  extend type Mutation {
    createCategory(input: createCategoryInput!): Category!
    EditCategory(input: EditCategoryInput!): Category
    deleteCategory(categoryid:ID!): Boolean!
  }
  # -----------------------------------------------
  # INPUT
  # -----------------------------------------------
input createCategoryInput{
    categoryid: ID
    name: String!
    bannerpic: String
}
input EditCategoryInput{
    categoryid: ID!
    name: String
    bannerpic: String
}
`;