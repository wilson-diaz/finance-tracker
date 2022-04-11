import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { LOGIN } from '../queries'
import { Form, Button, Segment, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [login, result] = useLazyQuery(LOGIN, {
    onError: (error) => setErrorMessage(error.message)
  })

  const handleLogin = () => {
    if (!username || !password) {
      setErrorMessage('Please enter your credentials.')
    } else {
      login({ variables: { username, password } })
    }
  }

  useEffect(() => {
    if (result.data && !result.data.loading && !result.error) {
      setToken(result.data.login.value)
      localStorage.setItem('userToken', result.data.login.value)
    }
    if (result.error) {
      setErrorMessage(result.error.message)
    }
  }, [result.data, result.error])

  return (
    <Grid columns={3}>
      <Grid.Column></Grid.Column>
      <Grid.Column>
        <Segment>
          <Form>
            <Form.Field width={16}>
              <label>Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Field>
            <Form.Field width={16}>
              <label>Password</label>
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Field>
            <Button type='submit' onClick={handleLogin}>Log In</Button>
          </Form>
        </Segment>
        { errorMessage && <ErrorMessage content={errorMessage} /> }
      </Grid.Column>
      <Grid.Column></Grid.Column>
    </Grid>
  )
}
LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginForm