const { gql } = require('apollo-server')

module.exports = gql`
  type User {
    id: ID!
    username: String!
  }

  type Category {
    id: ID!
    name: String!
    isEnabled: Boolean!
  }

  type Transaction {
    id: ID!
    date: String!
    amount: Float!
    details: String
    category: Category!
  }

  type Query {
    userTransactions: [Transaction]
    userCategories: [Category]
    login(
      username: String!
      password: String!
    ): Token
  }

  type Token {
    value: String!
  }

  type Mutation {
    recordTransaction(
      date: String!
      amount: Float!
      details: String
      category: String! 
    ): Transaction
    editTransaction(
      id: ID!
      date: String!
      amount: Float!
      details: String
      category: String! 
    ): Transaction
    addCategory(
      name: String!
    ): Category
    editCategory(
      id: ID!
      name: String
      isEnabled: Boolean
    ): Category
    createUser(
      username: String!
      password: String!
    ): User
  }
`