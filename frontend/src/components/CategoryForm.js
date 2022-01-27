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
          userCategories: [...storeData.userCategories, response.data.addCategory]
        }
      })
    }
  })

  // use to show/hide form and Add button
  const [isFormVisible, setIsFormVisible] = useState(false)

  const toggleVisibility = () => setIsFormVisible(!isFormVisible)

  const handleSubmit = (e) => {
    e.preventDefault()
    addCategory({ variables: { name: categoryName } })

    setCategoryName('')
  }

  return (
    <div>
      <Button style={{ float: 'right', display: isFormVisible ? 'none' : '' }} onClick={toggleVisibility}>
        + Add Category
      </Button>
      <Segment style={{ clear: 'right', display: isFormVisible ? '' : 'none' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Input label='New Category' type='text' placeholder='Name' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
          <Button type='button' onClick={toggleVisibility}>Cancel</Button>
          <Button type='submit'>Submit</Button>
        </Form>
      </Segment>
    </div>
  )
}

export default CategoryForm