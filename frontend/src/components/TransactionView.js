import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'
import { Segment, Header, Button, Icon } from 'semantic-ui-react'
import { GET_USER_TRANSACTIONS } from '../queries'
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

  if (!transaction) {
    return <p>loading...</p>
  }

  return (
    <>
      <Segment>
        <Header as='h3'>Transaction Details</Header>
        <TransactionForm transaction={transaction} />
      </Segment>
      <Button as={Link} to='/transactions'>
        <Icon name='arrow left'/>
        Back
      </Button>
    </>
  )
}

export default TransactionView