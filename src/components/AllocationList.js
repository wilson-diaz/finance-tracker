/* eslint-disable react/prop-types */
import React from 'react'
import { List, Header } from 'semantic-ui-react'

const AllocationList = () => {
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
        {data.map(ele => <List.Item key={ele.name}>{`${ele.name}: $${ele.value}`}</List.Item>)}
      </List>
    </>
  )
}

export default AllocationList
