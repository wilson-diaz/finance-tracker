import React, { useState, useEffect } from 'react'
import { Grid, Segment, Header } from 'semantic-ui-react'
import ExpensesPie from './ExpensesPie'
import ExpenseCategoryList from './ExpenseCategoryList'
import CategoryForm from './CategoryForm'
import { GET_USER_CATEGORIES, GET_USER_TRANSACTIONS } from '../queries'
import { useQuery } from '@apollo/client'

const AnalyzePage = () => {
  const transactionsResult = useQuery(GET_USER_TRANSACTIONS)
  const categoriesResult = useQuery(GET_USER_CATEGORIES)

  const [categoryTotals, setCategoryTotals] = useState([])
  const [monthlyExpenses, setMonthlyExpenses] = useState([])

  const [date] = useState(new Date())

  useEffect(() => {
    if (!transactionsResult.loading && transactionsResult.data && !categoriesResult.loading && categoriesResult.data) {
      // get transactions for month
      const tempMonthly = transactionsResult.data.userTransactions.filter(t => t.category.isEnabled && new Date(Number(t.date)).getMonth() === date.getMonth())
      setMonthlyExpenses(tempMonthly)

      const categories = categoriesResult.data.userCategories.map(cat => {
        if (cat.isEnabled) {
          return {
            id: cat.id,
            name: cat.name,
            value: 0
          }
        }
      })

      // get sum of transactions per category
      setCategoryTotals(
        tempMonthly.reduce((acc, t) => {
          // update category record
          const category = acc.find(cat => cat.id === t.category.id)
          category.value += t.amount

          return acc
        }, categories)
      )
    }
  }, [transactionsResult.loading, transactionsResult.data, categoriesResult.loading, categoriesResult.data])

  return (
    <Segment>
      <Header as='h2'>Current Expenses</Header>
      <Grid columns={2}>
        <Grid.Column>
          <ExpensesPie categoryTotals={categoryTotals} />
        </Grid.Column>
        <Grid.Column>
          <ExpenseCategoryList categoryTotals={categoryTotals} monthlyExpenses={monthlyExpenses} />
          <CategoryForm />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default AnalyzePage