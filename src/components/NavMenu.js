import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'

const NavMenu = () => {
  const [activeItem, setActiveItem] = useState('allocations')
  const handleItemClick = (e, { name }) => setActiveItem(name)

  return (
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
  )
}

export default NavMenu