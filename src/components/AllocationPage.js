import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import AllocationChart from './AllocationChart'
import AllocationAmountList from './AllocationAmountList'

const AllocationPage = () => {
  return (
    <Segment>
      <Grid columns={2}>
        <Grid.Column>
          <AllocationChart />
        </Grid.Column>
        <Grid.Column>
          <AllocationAmountList />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default AllocationPage