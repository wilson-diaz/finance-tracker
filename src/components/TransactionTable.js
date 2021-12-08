import React from 'react'
import { Table } from 'semantic-ui-react'
import TransactionItem from './TransactionItem'

const TransactionTable = () => {
  const transactions = [
    { id: 1, date: '12-6-2021', type: 'WITHDRAW', allocation: 'Food', amount: 50.87, reason: 'went grocery shopping' },
    { id: 2, date: '12-6-2021', type: 'WITHDRAW', allocation: 'Investments', amount: 200.00, reason: 'bought some stock' },
    { id: 3, date: '12-7-2021', type: 'DEPOSIT', allocation: 'Savings', amount: 20.00, reason: 'found $20 bill' },
  ]

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Allocation</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>Reason</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {transactions.map(t => <TransactionItem key={t.id} transaction={t} />)}
      </Table.Body>
    </Table>
  )
}

export default TransactionTable