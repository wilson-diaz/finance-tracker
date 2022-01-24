import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { RECORD_TRANSACTION } from '../queries'
import { Form, Select } from 'semantic-ui-react'

const getMaxDate = () => {
  const today = new Date()
  const dayString = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
  const monthString = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1
  return `${today.getFullYear()}-${monthString}-${dayString}`
}

const TransactionForm = () => {
  const [recordTransaction] = useMutation(RECORD_TRANSACTION)
  const [date, setDate] = useState(getMaxDate())
  const [amount, setAmount] = useState('')
  const [details, setDetails] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    recordTransaction({ variables: { date, amount: Number(amount), details, category } })

    setDate('')
    setAmount('')
    setDetails('')
    setCategory('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input required label='Amount ($)' placeholder='0.00' value={amount} onChange={(e) => { setAmount(e.target.value) }} />
        <Form.Field required label='Category' control={Select} options={[{ key:'1', text: 'test', value: '61e4e52cfaf66b5c4dcc2c37' }]} placeholder='Category' value={category} onChange={(e, { value }) => { setCategory(value) }} />
        <Form.Field required label='Date' control='input' type='date' max={getMaxDate()} value={date} onChange={(e) => { setDate(e.target.value) }} />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field label='Details' control='input' placeholder='Optional notes...' value={details} onChange={(e) => { setDetails(e.target.value) }} />
      </Form.Group>
      <Form.Button>Submit</Form.Button>
    </Form>
  )
}

export default TransactionForm