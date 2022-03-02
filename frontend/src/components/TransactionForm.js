import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER_CATEGORIES, GET_USER_TRANSACTIONS, RECORD_TRANSACTION, EDIT_TRANSACTION } from '../queries'
import { Form, Button, Select, Icon, Label } from 'semantic-ui-react'
import { formatDateForInput } from '../utils'
import PropTypes from 'prop-types'

const TransactionForm = ({ transaction }) => {
  const [date, setDate] = useState(transaction ? formatDateForInput(new Date(Number(transaction.date))) : formatDateForInput(new Date()))
  const [amount, setAmount] = useState(transaction ? transaction.amount : '')
  const [details, setDetails] = useState(transaction ? transaction.details : '')
  const [category, setCategory] = useState(transaction ? transaction.category.id : '')

  // use to disable fields when viewing transaction
  const [isDisabled, setIsDisabled] = useState(!!transaction)

  const toggleDisabled = () => setIsDisabled(!isDisabled)

  // sets input values from transaction object values
  const resetToTransactionValues = () => {
    setDate(formatDateForInput(new Date(Number(transaction.date))))
    setAmount(transaction.amount)
    setDetails(transaction.details)
    setCategory(transaction.category.id)

    toggleDisabled()
  }

  const userCategoriesResult = useQuery(GET_USER_CATEGORIES)

  // options for select component
  const categoryOptions = []
  if (!userCategoriesResult.loading && userCategoriesResult.data) {
    userCategoriesResult.data.userCategories.forEach(cat => {
      if (!cat.isEnabled) return
      categoryOptions.push({ key: cat.id, text: cat.name, value: cat.id, disabled: isDisabled })
    })
  }

  // create new record if no transaction was passed
  const query = transaction ? EDIT_TRANSACTION : RECORD_TRANSACTION

  const [mutation, mutationResult] = useMutation(query, {
    update: (store, response) => {
      const transactionData = store.readQuery({ query: GET_USER_TRANSACTIONS })
      store.writeQuery({
        query: GET_USER_TRANSACTIONS,
        data: {
          ...transactionData,
          userTransactions: transaction
            ? transactionData.userTransactions.map(t => t.id === response.data.editTransaction.id ? response.data.editTransaction : t) // replace with edited
            : transactionData.userTransactions.concat(response.data.recordTransaction) // add new
        }
      })

      const categoryData = store.readQuery({ query: GET_USER_CATEGORIES })
      store.writeQuery({
        query: GET_USER_CATEGORIES,
        data: {
          ...categoryData,
          userCategories: transaction
            ? categoryData.userCategories
            : categoryData.userCategories.map(c => c.id === response.data.recordTransaction.category.id ? ({ ...c, numTransactions: c.numTransactions + 1 }) : c)
        }
      })
    }
  })

  useEffect(() => {
    if (transaction && mutationResult.data) {
      // edit mutation complete, reset to new values
      resetToTransactionValues()
    } else if (!transaction && mutationResult.data) {
      // record mutation complete, clear form
      setDate(formatDateForInput(new Date()))
      setAmount('')
      setDetails('')
      setCategory('')
    }
  }, [transaction, mutationResult.data])

  const handleSubmit = (e) => {
    e.preventDefault()
    const vars = {
      date: new Date(date + 'T00:00'),
      amount: Number(amount),
      details,
      category,
    }

    transaction && (vars.id = transaction.id) // send ID when editing

    mutation({ variables: vars })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input required
          label='Amount ($)' placeholder='0.00' value={amount} onChange={(e) => { setAmount(e.target.value) }}
          readOnly={isDisabled}
        />
        <Form.Field required
          label='Category' control={Select} options={categoryOptions}
          placeholder='Category' value={category} onChange={(e, { value }) => { setCategory(value) }}
          readOnly={isDisabled}
        />
        <Form.Field required
          label='Date' control='input' type='date'
          max={formatDateForInput(new Date())} value={date} onChange={(e) => { setDate(e.target.value) }}
          readOnly={isDisabled}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field
          label='Details' control='input' placeholder='Optional notes...'
          value={details} onChange={(e) => { setDetails(e.target.value) }}
          readOnly={isDisabled}
        />
      </Form.Group>
      { (transaction && isDisabled) && <><Button type='button' onClick={toggleDisabled}>Edit</Button> <Label basic><Icon name='lock' /> Fields locked</Label></> }
      { (transaction && !isDisabled) && <Button type='button' onClick={resetToTransactionValues}>Cancel</Button> }
      { !isDisabled && <Button type='submit'>Submit</Button> }
      { (transaction && !isDisabled) && <Label basic><Icon name='lock open' /> Fields unlocked</Label> }
    </Form>
  )
}

TransactionForm.propTypes = {
  transaction: PropTypes.object // provided when viewing/editing
}

export default TransactionForm