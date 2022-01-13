import React from 'react'
import PropTypes from 'prop-types'
import { Accordion, Form, Menu, Header, Divider } from 'semantic-ui-react'

const getMaxDate = () => {
  const today = new Date()
  const dayString = today.getDay() < 10 ? '0' + today.getDate() : today.getDay()
  return `${today.getFullYear()}-${today.getMonth() + 1}-${dayString}`
}

const AllocationAmount = ({ name, value, index, activeIndex, handleClick }) => {
  const ExpenseForm = (
    <Form>
      <Divider />
      <Header as='h4'>Record Expense</Header>
      <Form.Group widths='equal'>
        <Form.Input label='Amount ($)' placeholder='0.00'/>
        <Form.Field label='Date' control='input' type='date' max={getMaxDate()} /> {/* value={getMaxDate()} /> => make controlled form with hook */}
      </Form.Group>
      <Form.Button>Submit</Form.Button>
    </Form>
  )

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
      <Accordion.Content active={activeIndex === index} content={ExpenseForm} />
    </Menu.Item>
  )
}
AllocationAmount.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default AllocationAmount