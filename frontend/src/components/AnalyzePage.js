import React from 'react'
import { Grid, Segment, Header } from 'semantic-ui-react'
import ExpensesPie from './ExpensesPie'
import ExpenseCategoryList from './ExpenseCategoryList'
import CategoryForm from './CategoryForm'

const AnalyzePage = () => {
  return (
    <Segment>
      <Header as='h2'>Current Expenses</Header>
      <Grid columns={2}>
        <Grid.Column>
          <ExpensesPie />
        </Grid.Column>
        <Grid.Column>
          <ExpenseCategoryList />
          <CategoryForm />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default AnalyzePage