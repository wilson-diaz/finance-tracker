import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'
import { Segment, Header, Button, Icon, Message } from 'semantic-ui-react'
import { DELETE_TRANSACTION, GET_USER_CATEGORIES, GET_USER_TRANSACTIONS } from '../queries'
import TransactionForm from './TransactionForm'

const TransactionView = () => {
  const result = useQuery(GET_USER_TRANSACTIONS)
  const [transaction, setTransaction] = useState(null)

  const { transactionId } = useParams()

  useEffect(() => {
    if (!result.loading && result.data) {
      setTransaction(result.data.userTransactions.find(x => x.id === transactionId))
    }
  }, [result.loading, result.data])

  const [deleteTransaction, deleteResult] = useMutation(DELETE_TRANSACTION, {
    update: (store, response) => {
      const transactionData = store.readQuery({ query: GET_USER_TRANSACTIONS })
      const toDelete = transactionData.userTransactions.find(t => t.id === response.data.deleteTransaction)
      const categoryData = store.readQuery({ query: GET_USER_CATEGORIES })

      // update numTransactions
      store.writeQuery({
        query: GET_USER_CATEGORIES,
        data: {
          ...categoryData,
          userCategories: categoryData.userCategories.map(c => c.id === toDelete.category.id ? { ...c, numTransactions: c.numTransactions -1 } : c)
        }
      })

      // remove transaction
      store.modify({
        fields: {
          userTransactions(userTransactions, { readField }) {
            return userTransactions.filter(t => readField('id', t) !== response.data.deleteTransaction)
          }
        }
      })
    }
  })

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction({ variables: { id: transaction.id } })
    }
  }

  const backButton = (
    <Button as={Link} to='/transactions'>
      <Icon name='arrow left'/>
      Back
    </Button>
  )

  // no transaction found with path param value
  if (!result.loading && !transaction) {
    const messageContent = deleteResult.data
      ? 'Transaction deleted successfully.'
      : 'Transaction does not exist.'

    return (
      <>
        <Message success={deleteResult.data && true} content={messageContent} />
        { backButton }
      </>
    )
  }

  return (
    <>
      <Segment>
        <Header as='h3'>Transaction Details</Header>
        <TransactionForm transaction={transaction} />

        <Header as='h4'>Delete Transaction</Header>
        <Button negative onClick={handleDelete}>
          <Icon name='trash alternate'/>
          Delete
        </Button>
      </Segment>
      { backButton }
    </>
  )
}

export default TransactionView