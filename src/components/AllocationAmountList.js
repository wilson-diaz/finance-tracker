/* eslint-disable react/prop-types */
import React from 'react'
import { List, Header } from 'semantic-ui-react'
import AllocationAmount from './AllocationAmount'

const AllocationAmountList = () => {
  const data = [
    { name: 'Food', value: 400 },
    { name: 'Savings', value: 6000 },
    { name: 'Investments', value: 200 },
    { name: 'Rent', value: 800 },
  ]
  return (
    <>
      <Header as='h3'>Current Amounts</Header>
      <List divided verticalAlign='middle'>
        {data.map(ele => <AllocationAmount key={ele.name} name={ele.name} value={ele.value} />)}
      </List>
    </>
  )
}

export default AllocationAmountList
