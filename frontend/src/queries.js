import { gql } from '@apollo/client'

export const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
}
`

export const GET_USER_CATEGORIES = gql`
  query {
    userCategories {
      id
      name
      isEnabled
    }
  }
`

export const GET_USER_TRANSACTIONS = gql`
  query {
    userTransactions {
      id
      date
      amount
      details
      category {
        id
        name
        isEnabled
      }
    }
  }
`

export const ADD_CATEGORY = gql`
  mutation AddCategory($name: String!) {
    addCategory(name: $name) {
      id
      name
      isEnabled
    }
  }
`

export const RECORD_TRANSACTION = gql`
  mutation recordTransaction($date: String!, $amount: Float!,
    $details: String, $category: String!) {
    recordTransaction(
      date: $date,
      amount: $amount,
      details: $details,
      category: $category
    ) {
      id
      date
      amount
      details
      category {
        id
        name
        isEnabled
      }
    }
  }
`

export const EDIT_TRANSACTION = gql`
  mutation editTransaction($id: ID!, $date: String!, $amount: Float!,
    $details: String, $category: String!) {
    editTransaction(
      id: $id,
      date: $date,
      amount: $amount,
      details: $details,
      category: $category
    ) {
      id
      date
      amount
      details
      category {
        id
        name
        isEnabled
      }
    }
  }
`

export const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($id: ID!) {
    deleteTransaction(
      id: $id
    )
  }
`