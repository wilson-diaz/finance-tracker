import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container, Header } from 'semantic-ui-react'
import NavMenu from './components/NavMenu'
import AllocationPage from './components/AllocationPage'
import DepositForm from './components/DepositForm'

const App = () => {
  const appStyle = {
    paddingTop: '5em'
  }

  return (
    <div style={appStyle}>
      <Container>
        <Header as="h1">Finance Tracker</Header>
        <NavMenu />
        <Routes>
          <Route exact path='/' element={<AllocationPage />} />
          <Route exact path='allocations' element={<AllocationPage />} />
          <Route exact path='deposit' element={<DepositForm />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
