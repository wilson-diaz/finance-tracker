import React from 'react'
import { Segment, Header, Divider } from 'semantic-ui-react'
import TransactionTable from './TransactionTable'
import TransactionForm from './TransactionForm'

const TransactionPage = () => {
  return (
    <Segment>
      <Header as='h3'>Record Transaction</Header>
      <TransactionForm />
      <Divider />
      <Header as='h3'>Past Transactions</Header>
      <TransactionTable />
    </Segment>
  )
}

export default TransactionPage