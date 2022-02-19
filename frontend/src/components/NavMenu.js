import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const NavMenu = ({ client, setToken }) => {
  const location = useLocation()

  const handleLogout = () => {
    setToken(null)
    client.clearStore()
    localStorage.clear()
  }

  return (
    <Menu pointing secondary>
      <Menu.Item
        as={Link} to='/analyze'
        name='analyze'
        active={location.pathname === '/analyze'}
      />
      <Menu.Item
        as={Link} to='/transactions'
        name='transactions'
        active={location.pathname === '/transactions'}
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='logout'
          onClick={handleLogout}
        />
      </Menu.Menu>
    </Menu>
  )
}

NavMenu.propTypes = {
  setToken: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
}

export default NavMenu