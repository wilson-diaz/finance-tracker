import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER_CATEGORIES, GET_USER_TRANSACTIONS, RECORD_TRANSACTION } from '../queries'
import { Form, Select } from 'semantic-ui-react'
import { getMaxDate } from '../utils'

const TransactionForm = () => {
  const [date, setDate] = useState(getMaxDate())
  const [amount, setAmount] = useState('')
  const [details, setDetails] = useState('')
  const [category, setCategory] = useState('')

  const userCategoriesResult = useQuery(GET_USER_CATEGORIES)

  // options for select component
  const categoryOptions = []
  if (!userCategoriesResult.loading && userCategoriesResult.data) {
    userCategoriesResult.data.userCategories.forEach(cat => {
      if (!cat.isEnabled) return
      categoryOptions.push({ key: cat.id, text: cat.name, value: cat.id })
    })
  }

  const [recordTransaction] = useMutation(RECORD_TRANSACTION, {
    update: (store, response) => {
      const storeData = store.readQuery({ query: GET_USER_TRANSACTIONS })
      store.writeQuery({
        query: GET_USER_TRANSACTIONS,
        data: {
          ...storeData,
          userTransactions: [...storeData.userTransactions, response.data.recordTransaction]
        }
      })
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    recordTransaction({ variables: { date: new Date(date + 'T00:00'), amount: Number(amount), details, category } })

    setDate('')
    setAmount('')
    setDetails('')
    setCategory('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input required
          label='Amount ($)' placeholder='0.00' value={amount} onChange={(e) => { setAmount(e.target.value) }}
        />
        <Form.Field required
          label='Category' control={Select} options={categoryOptions}
          placeholder='Category' value={category} onChange={(e, { value }) => { setCategory(value) }}
        />
        <Form.Field required
          label='Date' control='input' type='date'
          max={getMaxDate()} value={date} onChange={(e) => { setDate(e.target.value) }}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field
          label='Details' control='input' placeholder='Optional notes...'
          value={details} onChange={(e) => { setDetails(e.target.value) }}
        />
      </Form.Group>
      <Form.Button>Submit</Form.Button>
    </Form>
  )
}

export default TransactionForm