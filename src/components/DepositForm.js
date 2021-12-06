import React from 'react'
import { Form, Header, Segment } from 'semantic-ui-react'

const DepositForm = () => {
  const getMaxDate = () => {
    const today = new Date()
    const dayString = today.getDay() < 10 ? '0' + today.getDate() : today.getDay()
    return `${today.getFullYear()}-${today.getMonth() + 1}-${dayString}`
  }
  return (
    <>
      <Segment>
        <Header as='h3'>Record a Deposit</Header>
        <p>Submit the amount and date of a deposit to automatically allocate your earnings based on the selected budget percentages.</p>
        <Form>
          <Form.Input label='Amount ($)' placeholder='0.00'/>
          <Form.Field label='Date' control='input' type='date' max={getMaxDate()} /> {/* value={getMaxDate()} /> => make controlled form with hook */}
          <Form.Button>Submit</Form.Button>
        </Form>
      </Segment>
    </>
  )
}

export default DepositForm