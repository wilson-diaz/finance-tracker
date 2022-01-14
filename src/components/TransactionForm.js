import React from 'react'
import { Form } from 'semantic-ui-react'

const getMaxDate = () => {
  const today = new Date()
  const dayString = today.getDay() < 10 ? '0' + today.getDate() : today.getDay()
  return `${today.getFullYear()}-${today.getMonth() + 1}-${dayString}`
}

const TransactionForm = () => (
  <Form>
    <Form.Group widths='equal'>
      <Form.Input label='Amount ($)' placeholder='0.00'/>
      <Form.Field label='Date' control='input' type='date' max={getMaxDate()} /> {/* value={getMaxDate()} /> => make controlled form with hook */}
    </Form.Group>
    <Form.Button>Submit</Form.Button>
  </Form>
)

export default TransactionForm