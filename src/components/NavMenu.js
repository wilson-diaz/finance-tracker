import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const NavMenu = ({ setToken }) => {
  const [activeItem, setActiveItem] = useState('analyze')
  const handleItemClick = (e, { name }) => setActiveItem(name)

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
          onClick={() => setToken(null)}
        />
      </Menu.Menu>
    </Menu>
  )
}

NavMenu.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default NavMenu