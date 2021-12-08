import React from 'react'
import PropTypes from 'prop-types'
import { Grid, List, Segment } from 'semantic-ui-react'
import AllocationAmountFormModal from './AllocationAmountFormModal'

const AllocationAmount = ({ name, value }) => {
  return (
    <List.Item key={name}>
      <Segment basic>
        <Grid columns={2} verticalAlign='middle'>
          <Grid.Column>
            <p>{`${name}: $${value}`}</p>
          </Grid.Column>
          <Grid.Column>
            <AllocationAmountFormModal />
          </Grid.Column>
        </Grid>
      </Segment>
    </List.Item>
  )
}
AllocationAmount.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default AllocationAmount