import React from 'react'
import { Grid } from 'semantic-ui-react'
import AllocationChart from './AllocationChart'
import AllocationList from './AllocationList'

const AllocationPage = () => {
  return (
    <Grid columns={2}>
      <Grid.Column>
        <AllocationChart />
      </Grid.Column>
      <Grid.Column>
        <AllocationList />
      </Grid.Column>
    </Grid>
  )
}

export default AllocationPage