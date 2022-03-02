import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import { Container, Header, Image } from 'semantic-ui-react'
import NavMenu from './components/NavMenu'
import AnalyzePage from './components/AnalyzePage'
import TransactionPage from './components/TransactionPage'
import TransactionView from './components/TransactionView'
import LoginForm from './components/LoginForm'
import icon from './assets/favicon.ico'
import CategoriesView from './components/CategoriesView'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const localToken = localStorage.getItem('userToken')
    if (localToken) setToken(localToken)
  }, [localStorage.getItem('userToken')])

  const appStyle = {
    paddingTop: '5em'
  }

  if (!token) {
    return (
      <Container style={appStyle}>
        <Header as="h1" icon textAlign='center'>
          <Image src={icon} />
          <Header.Content>Finance Tracker</Header.Content>
        </Header>
        <LoginForm setToken={setToken} />
      </Container>
    )
  }

  return (
    <Container style={appStyle}>
      <Header as="h1">Finance Tracker</Header>
      <NavMenu client={client} setToken={setToken} />
      <Routes>
        <Route exact path='/' element={<AnalyzePage />} />
        <Route exact path='analyze' element={<AnalyzePage />} />
        <Route exact path='transactions' element={<TransactionPage />} />
        <Route exact path='transactions/:transactionId' element={<TransactionView />} />
        <Route exact path='categories' element={<CategoriesView />} />
      </Routes>
    </Container>
  )
}

export default App
