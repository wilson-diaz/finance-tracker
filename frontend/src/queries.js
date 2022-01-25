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
        name
      }
    }
  }
`