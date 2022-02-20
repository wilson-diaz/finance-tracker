import React, { useState } from 'react'
import { Accordion, Menu, Message } from 'semantic-ui-react'
import ExpenseCategory from './ExpenseCategory'
import PropTypes from 'prop-types'

const ExpenseCategoryList = ({ categoryTotals, monthlyExpenses }) => {
  // accordion list functionality
  const [activeIndex, setActiveIndex] = useState(-1)
  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    setActiveIndex(activeIndex === index ? -1 : index)
  }

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

ExpenseCategoryList.propTypes = {
  categoryTotals: PropTypes.array.isRequired,
  monthlyExpenses: PropTypes.array.isRequired
}

export default ExpenseCategoryList
