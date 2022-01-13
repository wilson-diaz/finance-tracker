import React, { useState } from 'react'
import { Header, Accordion, Menu } from 'semantic-ui-react'
import AllocationAmount from './AllocationAmount'

const AllocationAmountList = () => {
  const data = [
    { name: 'Food', value: 400 },
    { name: 'Savings', value: 6000 },
    { name: 'Investments', value: 200 },
    { name: 'Rent', value: 800 },
  ]

  const [activeIndex, setActiveIndex] = useState(-1)

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    setActiveIndex(activeIndex === index ? -1 : index)
  }

  return (
    <>
      <Header as='h3'>Expenses</Header>
      <Accordion as={Menu} vertical fluid>
        {data.map((ele, i) => <AllocationAmount key={ele.name} name={ele.name} value={ele.value} index={i} activeIndex={activeIndex} handleClick={handleClick} />)}
      </Accordion>
    </>
  )
}

export default AllocationAmountList
