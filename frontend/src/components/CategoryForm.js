import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { ADD_CATEGORY, GET_USER_CATEGORIES } from '../queries'

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('')
  const [addCategory] = useMutation(ADD_CATEGORY, {
    update: (store, response) => {
      const storeData = store.readQuery({ query: GET_USER_CATEGORIES })
      store.writeQuery({
        query: GET_USER_CATEGORIES,
        data: {
          ...storeData,
          userCategories: [...storeData.userCategories, { ...response.data.addCategory, numTransactions: 0 }]
        }
      })
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addCategory({ variables: { name: categoryName } })

    setCategoryName('')
  }

  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Form.Input label='New Category' type='text' placeholder='Name' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        <Button type='submit'>Submit</Button>
      </Form>
    </Segment>
  )
}

export default CategoryForm