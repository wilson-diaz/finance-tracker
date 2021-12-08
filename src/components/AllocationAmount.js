import React from 'react'
import PropTypes from 'prop-types'
import { List, Segment } from 'semantic-ui-react'
import AllocationAmountFormModal from './AllocationAmountFormModal'

const AllocationAmount = ({ name, value }) => {
  return (
    <List.Item key={name}>
      <Segment compact basic floated='right'>
        <AllocationAmountFormModal />
      </Segment>
      <List.Content>{`${name}: $${value}`}</List.Content>
    </List.Item>
  )
}
AllocationAmount.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default AllocationAmount