import React from 'react'
import { Container, Header, Grid } from 'semantic-ui-react'
import NavMenu from './components/NavMenu'
import AllocationChart from './components/AllocationChart'
import AllocationList from './components/AllocationList'

const App = () => {
  const appStyle = {
    paddingTop: '5em'
  }

  return (
    <div style={appStyle}>
      <Container>
        <Header as="h1">Finance Tracker</Header>
        <NavMenu />
        <Grid columns={2}>
          <Grid.Column>
            <AllocationChart />
          </Grid.Column>
          <Grid.Column>
            <AllocationList />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  )
}

export default App
