import React from 'react'
import { Grid, Segment, Header } from 'semantic-ui-react'
import AllocationChart from './AllocationChart'
import AllocationAmountList from './AllocationAmountList'

const AllocationPage = () => {
  return (
    <Segment>
      <Header as='h2'>Current Expenses</Header>
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