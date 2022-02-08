import React from 'react'
import PropTypes from 'prop-types'
import { Accordion, Menu, Table } from 'semantic-ui-react'

const ExpenseCategory = ({ name, value, transactions, index, activeIndex, handleClick }) => {
  const AccordionContent = (
    <b>{name}: ${value}</b>
  )

  const ExpenseList = (
    <Table compact fixed singleLine>
      <Table.Body>
        {
          transactions.sort((a, b) => new Date(Number(b.date)) - new Date(Number(a.date))).map(t => (
            <Table.Row key={t.id}>
              <Table.Cell width={3}>{new Date(Number(t.date)).toLocaleDateString()}</Table.Cell>
              <Table.Cell width={3}>${t.amount}</Table.Cell>
              <Table.Cell>{t.details}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table>
  )

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
  index: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default ExpenseCategory