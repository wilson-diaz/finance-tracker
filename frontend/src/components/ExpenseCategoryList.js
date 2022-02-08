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
  const [listData, setListData] = useState([])

  useEffect(() => {
    if (!transactionsResult.loading && transactionsResult.data && !categoriesResult.loading && categoriesResult.data) {
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
      const data = transactionsResult.data.userTransactions.reduce((acc, t) => {
        // only current month's transactions
        if (t.category.isEnabled && new Date(Number(t.date)).getMonth() === new Date().getMonth()) {
          // update category record
          const category = acc.find(cat => cat.id === t.category.id)
          category.value += t.amount
        }

        return acc
      }, categories)
      setListData(data)
    }
  }, [transactionsResult.loading, transactionsResult.data, categoriesResult.loading, categoriesResult.data])

  if (listData.length === 0) {
    return (
      <Message header='No Categories' content='You do not have any categories yet. Add one below.' />
    )
  }

  return (
    <Accordion as={Menu} vertical fluid>
      {
        listData.map((ele, i) => (
          <ExpenseCategory key={ele.id} name={ele.name} value={ele.value}
            index={i} activeIndex={activeIndex} handleClick={handleClick}
            transactions={transactionsResult.data.userTransactions.filter(t => t.category.isEnabled && t.category.id === ele.id && new Date(Number(t.date)).getMonth() === new Date().getMonth())}
          />
        ))
      }
    </Accordion>
  )
}

export default ExpenseCategoryList
