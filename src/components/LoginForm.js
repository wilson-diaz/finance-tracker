import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { LOGIN } from '../queries'
import { Form, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useLazyQuery(LOGIN)

  const handleLogin = () => {
    login({ variables: { username, password } })
  }

  useEffect(() => {
    if (result.data && !result.data.loading) {
      setToken(result.data.login.value)
      localStorage.setItem('userToken', result.data.login.value)
    }
  }, [result.data])

  return (
    <div>
      <Form>
        <Form.Field>
          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Field>
        <Button type='submit' onClick={handleLogin}>Login</Button>
      </Form>
    </div>
  )
}
LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginForm