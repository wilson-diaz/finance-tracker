import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const NavMenu = ({ client, setToken }) => {
  const [activeItem, setActiveItem] = useState('analyze')
  const handleItemClick = (e, { name }) => setActiveItem(name)

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
        active={activeItem === 'analyze'}
        onClick={handleItemClick}
      />
      <Menu.Item
        as={Link} to='/transactions'
        name='transactions'
        active={activeItem === 'transactions'}
        onClick={handleItemClick}
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
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