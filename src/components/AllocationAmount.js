import React from 'react'
import PropTypes from 'prop-types'
import { List, Button } from 'semantic-ui-react'

const AllocationAmount = ({ name, value }) => {
  return (
    <List.Item key={name}>
      <Button size='small' floated='right'>Edit</Button>
      <List.Content>{`${name}: $${value}`}</List.Content>
    </List.Item>
  )
}
AllocationAmount.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default AllocationAmount