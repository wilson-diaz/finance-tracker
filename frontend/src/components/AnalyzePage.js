import React, { useState, useEffect } from 'react'
import { Grid, Segment, Header, Icon, Button } from 'semantic-ui-react'
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

  const dateToStore = new Date()
  dateToStore.setDate(1) // start at 1st to avoid edge cases when changing months
  const [date, setDate] = useState(dateToStore)

  // step is +/- 1
  const handleMonthChange = step => {
    const newDate = new Date(date.getTime()) // clone to avoid mutating state
    newDate.setMonth(date.getMonth() + step) // automatically handles values > 11 and < 0
    setDate(newDate)
  }

  useEffect(() => {
    if (!transactionsResult.loading && transactionsResult.data && !categoriesResult.loading && categoriesResult.data) {
      // get transactions for month
      const tempMonthly = transactionsResult.data.userTransactions.filter(t => {
        const transactionDate = new Date(Number(t.date))
        return t.category.isEnabled && transactionDate.getMonth() === date.getMonth() && transactionDate.getFullYear() === date.getFullYear()
      })
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
  }, [transactionsResult.loading, transactionsResult.data, categoriesResult.loading, categoriesResult.data, date])

  return (
    <Segment>
      <Grid verticalAlign='middle'>
        <Grid.Column>
          <Button icon onClick={() => handleMonthChange(-1)}><Icon name='chevron left' /></Button>
        </Grid.Column>
        <Grid.Column width={3}>
          <Header as='h2' textAlign='center'>
            {date.toLocaleString(undefined, { month: 'long', year: 'numeric' })}
          </Header>
        </Grid.Column>
        <Grid.Column>
          <Button icon onClick={() => handleMonthChange(1)} disabled={date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth()}>
            <Icon name='chevron right' />
          </Button>
        </Grid.Column>
      </Grid>
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