import React, { useState } from 'react'
import { Container, Header, Grid, Menu } from 'semantic-ui-react'
import AllocationChart from './components/AllocationChart'
import AllocationList from './components/AllocationList'

const App = () => {
  const appStyle = {
    paddingTop: '5em'
  }
  const [activeItem, setActiveItem] = useState('allocations')
  const handleItemClick = (e, { name }) => setActiveItem(name)
  return (
    <div style={appStyle}>
      <Container>
        <Header as="h1">Finance Tracker</Header>
        <Menu pointing secondary>
          <Menu.Item
            name='allocations'
            active={activeItem === 'allocations'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='deposit'
            active={activeItem === 'deposit'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='transactions'
            active={activeItem === 'transactions'}
            onClick={handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu>
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
