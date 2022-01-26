import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Accordion, Menu, Message } from 'semantic-ui-react'
import { GET_USER_TRANSACTIONS } from '../queries'
import ExpenseCategory from './ExpenseCategory'

const ExpenseCategoryList = () => {
  // const data = [
  //   { name: 'Food', value: 400 },
  //   { name: 'Savings', value: 6000 },
  //   { name: 'Investments', value: 200 },
  //   { name: 'Rent', value: 800 },
  // ]

  // data.splice(0, data.length)

  // accordion list functionality
  const [activeIndex, setActiveIndex] = useState(-1)
  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    setActiveIndex(activeIndex === index ? -1 : index)
  }

  const transactionsResult = useQuery(GET_USER_TRANSACTIONS)
  const [listData, setListData] = useState([])

  useEffect(() => {
    if (!transactionsResult.loading && transactionsResult.data) {
      const data = transactionsResult.data.userTransactions.reduce((acc, t) => {
        // only current month's transactions
        if (t.category.isEnabled && new Date(Number(t.date)).getMonth() === new Date().getMonth()) {
          // check if already aggregating for category, create new record if not
          const category = acc.find(cat => cat.id === t.category.id)
          if (category) {
            category.value += t.amount
          } else {
            acc.push({ id: t.category.id, name: t.category.name, value: t.amount })
          }
        }

        return acc
      }, [])

      setListData(data)
    }
  }, [transactionsResult.loading, transactionsResult.data])

  if (transactionsResult.data && transactionsResult.data.userTransactions.length === 0) {
    return (
      <Message>You do not have any categories yet. Add one below!</Message>
    )
  }

  return (
    <Accordion as={Menu} vertical fluid>
      {listData.map((ele, i) => <ExpenseCategory key={ele.id} name={ele.name} value={ele.value} index={i} activeIndex={activeIndex} handleClick={handleClick} />)}
    </Accordion>
  )
}

export default ExpenseCategoryList
