import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

const TransactionItem = ({ transaction }) => {
  const isDeposit = transaction.type === 'DEPOSIT'
  const transactionSymbol = isDeposit ? '+' : '-'

  return (
    <Table.Row positive={isDeposit} negative={!isDeposit}>
      <Table.Cell>{ transaction.date }</Table.Cell>
      <Table.Cell>{ transaction.allocation}</Table.Cell>
      <Table.Cell>{ transaction.type}</Table.Cell>
      <Table.Cell>{ transactionSymbol + `$${transaction.amount}` }</Table.Cell>
      <Table.Cell>{ transaction.reason }</Table.Cell>
    </Table.Row>
  )
}
TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    date: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    allocation: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    reason: PropTypes.string
  })
}

export default TransactionItem