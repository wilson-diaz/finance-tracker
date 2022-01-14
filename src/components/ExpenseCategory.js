import React from 'react'
import PropTypes from 'prop-types'
import { Accordion, Menu } from 'semantic-ui-react'

const ExpenseCategory = ({ name, value, index, activeIndex, handleClick }) => {
  const AccordionContent = (
    <b>{name}: ${value}</b>
  )

  return (
    <Menu.Item key={name}>
      <Accordion.Title
        active={activeIndex === index}
        content={AccordionContent}
        index={index}
        onClick={handleClick}
      />
      <Accordion.Content active={activeIndex === index} content={<p>TODO: List of expenses</p>} />
    </Menu.Item>
  )
}
ExpenseCategory .propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default ExpenseCategory