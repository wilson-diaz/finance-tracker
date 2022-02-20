import React from 'react'
import PropTypes from 'prop-types'
import { Accordion, Menu, Table, Message, Icon } from 'semantic-ui-react'

const ExpenseCategory = ({ name, value, transactions, numTransactions, index, activeIndex, handleClick }) => {
  const AccordionContent = (
    <b>{name}: ${value}</b>
  )

  const ExpenseList = transactions.length > 0
    ?
    (
      <Table compact fixed singleLine>
        <Table.Body>
          {
            transactions.map(t => (
              <Table.Row key={t.id}>
                <Table.Cell width={3}>{new Date(Number(t.date)).toLocaleDateString()}</Table.Cell>
                <Table.Cell width={3}>${t.amount}</Table.Cell>
                <Table.Cell>{t.details}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
        { numTransactions > 5 && <Table.Footer><Table.Row><Table.HeaderCell textAlign='center' colSpan='3'>See {numTransactions - 5} More <Icon name='arrow right'/></Table.HeaderCell></Table.Row></Table.Footer>}
      </Table>
    )
    : <Message size='small' content='No expenses for this category during this month.' />

  return (
    <Menu.Item key={name}>
      <Accordion.Title
        active={activeIndex === index}
        content={AccordionContent}
        index={index}
        onClick={handleClick}
      />
      <Accordion.Content active={activeIndex === index} content={ExpenseList} />
    </Menu.Item>
  )
}
ExpenseCategory .propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  transactions: PropTypes.array.isRequired,
  numTransactions: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default ExpenseCategory