import React from 'react'
import { Grid } from 'semantic-ui-react'
import AllocationChart from './AllocationChart'
import AllocationAmountList from './AllocationAmountList'

const AllocationPage = () => {
  return (
    <Grid columns={2}>
      <Grid.Column>
        <AllocationChart />
      </Grid.Column>
      <Grid.Column>
        <AllocationAmountList />
      </Grid.Column>
    </Grid>
  )
}

export default AllocationPage