import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    role: String!
  }

  type Package {
    id: ID!
    name: String!
    description: String!
    price: Float!
    expirationDate: String!
    createdBy: String!
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    getPackages(minDate: String, maxDate: String): [Package!]
    getPackageById(id: ID!): Package
  }

  type Mutation {
    registerUser(username: String!, password: String!, role: String!): User!
    loginUser(username: String!, password: String!): AuthPayload!
    logoutUser: Boolean!
    createPackage(name: String!, description: String!, price: Float!, expirationDate: String!): Package
    updatePackage(id: ID!, name: String, description: String, price: Float): Package
    deletePackage(id: ID!): Boolean
  }
`;
