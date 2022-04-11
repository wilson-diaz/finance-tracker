import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER_CATEGORIES, EDIT_CATEGORY, DELETE_CATEGORY } from '../queries'
import { Segment, Header, Grid, Message, Item, Button, Icon } from 'semantic-ui-react'
import CategoryForm from './CategoryForm'

const CategoriesView = () => {
  const PAGE_SIZE = 5
  const [pageIndex, setPageIndex] = useState(0)
  const [slicedCategories, setSlicedCategories] = useState([])

  const categoryResult = useQuery(GET_USER_CATEGORIES)

  useEffect(() => {
    if (!categoryResult.loading && categoryResult.data) {
      const tempSliced = categoryResult.data.userCategories.slice(pageIndex, pageIndex + PAGE_SIZE)
      if (tempSliced.length === 0 && pageIndex > 0) {
        // automatically paginate if page empty after deleting only item
        setPageIndex(pageIndex - PAGE_SIZE)
        setSlicedCategories(categoryResult.data.userCategories.slice(pageIndex, pageIndex + PAGE_SIZE))
      } else {
        setSlicedCategories(tempSliced)
      }
    }
  }, [categoryResult.loading, categoryResult.data, pageIndex])

  // store is updated automatically with modified object from server
  const [editCategory] = useMutation(EDIT_CATEGORY)

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    update: (store, response) => {
      store.modify({
        fields: {
          userCategories(userCategories, { readField }) {
            // remove category from cache
            return userCategories.filter(c => readField('id', c) !== response.data.deleteCategory)
          },
          userTransactions(userTransactions, { readField }) {
            return userTransactions.filter(t => {
              // remove transactions of this category from cache
              return readField('id', readField('category', t)) !== response.data.deleteCategory
            })
          }
        }
      })
    }
  })

  const handleEdit = (vars) => {
    editCategory({ variables: { ...vars } })
  }

  const handleDelete = (x) => {
    if (window.confirm('Are you sure you want to delete this category and all it\'s transactions?')) {
      deleteCategory({ variables: { id: x.id } })
    }
  }

  if (!categoryResult.data || categoryResult.data.userCategories.length === 0) {
    return (
      <>
        <Message header='No Categories' content='You do not have any categories yet. Add one using the form.' />
        <CategoryForm />
      </>
    )
  }

  return (
    <Segment style={{ paddingBottom: '3em' }}>
      <Header as='h3'>Expense Categories</Header>
      <Grid columns={2} divided>
        <Grid.Column>
          <Message>
            <Message.Header>Category Management</Message.Header>
            <Message.List>
              <Message.Item><b>Disable</b>: Effectively hides the category and its transactions from view.</Message.Item>
              <Message.Item><b>Delete</b>: Permanently deletes the category and all of its transactions.</Message.Item>
            </Message.List>
          </Message>
          <Header as='h3'>Add Category</Header>
          <CategoryForm />
        </Grid.Column>
        <Grid.Column>
          {
            <>
              <Item.Group divided style={{ height: '30em' }}>
                {slicedCategories.map(cat => {
                  return (
                    <Item key={cat.id}>
                      <Grid container columns={2}>
                        <Grid.Row>
                          <Grid.Column>
                            <Item.Header as='h4'>{cat.name}</Item.Header>
                            <Item.Meta>Number of transactions: {cat.numTransactions}</Item.Meta>
                          </Grid.Column>
                          <Grid.Column verticalAlign='middle'>
                            <Item.Content>
                              <Item.Description>
                                <Button size='tiny' color={cat.isEnabled ? 'yellow' : 'green'}
                                  style={{ marginRight: '1em' }}
                                  onClick={() => handleEdit({ id: cat.id, isEnabled: !cat.isEnabled })}
                                >
                                  <Icon name={cat.isEnabled ? 'minus square' : 'plus square'} />
                                  {cat.isEnabled ? 'Disable' : 'Enable'}
                                </Button>
                                <Button size='tiny' negative onClick={() => handleDelete(cat)}>
                                  <Icon name='trash alternate' />
                                  Delete
                                </Button>
                              </Item.Description>
                            </Item.Content>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Item>
                  )
                })}
              </Item.Group><Button icon disabled={0 > pageIndex - PAGE_SIZE}
                onClick={() => setPageIndex(pageIndex - PAGE_SIZE)}
                style={{ width: '5em' }}
              >
                <Icon name='angle left' />
              </Button><Button icon disabled={categoryResult.data.userCategories.length <= pageIndex + PAGE_SIZE}
                onClick={() => setPageIndex(pageIndex + PAGE_SIZE)}
                style={{ width: '5em' }}
              >
                <Icon name='angle right' />
              </Button>
            </>
          }
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default CategoriesView