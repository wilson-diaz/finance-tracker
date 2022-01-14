import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container, Header } from 'semantic-ui-react'
import NavMenu from './components/NavMenu'
import AnalyzePage from './components/AnalyzePage'
import TransactionPage from './components/TransactionPage'

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
          <Route exact path='/' element={<AnalyzePage />} />
          <Route exact path='analyze' element={<AnalyzePage />} />
          <Route exact path='transactions' element={<TransactionPage />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
