import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Accordion, Menu, Message } from 'semantic-ui-react'
import { GET_USER_CATEGORIES, GET_USER_TRANSACTIONS } from '../queries'
import ExpenseCategory from './ExpenseCategory'

const ExpenseCategoryList = () => {
  // accordion list functionality
  const [activeIndex, setActiveIndex] = useState(-1)
  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    setActiveIndex(activeIndex === index ? -1 : index)
  }

  const transactionsResult = useQuery(GET_USER_TRANSACTIONS)
  const categoriesResult = useQuery(GET_USER_CATEGORIES)
  const [categoryTotals, setCategoryTotals] = useState([])
  const [monthlyExpenses, setMonthlyExpenses] = useState([])

  const [month] = useState(new Date().getMonth())

  useEffect(() => {
    if (!transactionsResult.loading && transactionsResult.data && !categoriesResult.loading && categoriesResult.data) {
      // get transactions for month
      const tempMonthly = transactionsResult.data.userTransactions.filter(t => t.category.isEnabled && new Date(Number(t.date)).getMonth() === month)
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

  if (categoryTotals.length === 0) {
    return (
      <Message header='No Categories' content='You do not have any categories yet. Add one below.' />
    )
  }

  return (
    <Accordion as={Menu} vertical fluid>
      {
        categoryTotals.map((ele, i) => {

          const expensesForCategory =
            monthlyExpenses
              .filter(t => t.category.id === ele.id)
              .sort((a, b) => new Date(Number(b.date)) - new Date(Number(a.date)))

          return(
            <ExpenseCategory key={ele.id} name={ele.name} value={ele.value}
              index={i} activeIndex={activeIndex} handleClick={handleClick}
              transactions={expensesForCategory.slice(0,5)}
              numTransactions={expensesForCategory.length}
            />
          )
        })
      }
    </Accordion>
  )
}

export default ExpenseCategoryList
