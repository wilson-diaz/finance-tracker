import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const Toggle = (props) => {
  const [isChildVisible, setIsChildVisible] = useState(false)

  const toggleVisibility = () => {
    setIsChildVisible(!isChildVisible)
  }

  return (
    <>
      <Button style={{ display: isChildVisible ? 'none' : '', ...props.buttonStyle }} onClick={toggleVisibility}>
        {props.buttonContent}
      </Button>
      <div style={{ display: isChildVisible ? '' : 'none' }}>
        {props.children}
        <Button style={props.buttonStyle} onClick={toggleVisibility}>Cancel</Button>
      </div>
    </>
  )
}

Toggle.propTypes = {
  children: PropTypes.object.isRequired,
  buttonContent: PropTypes.object.isRequired,
  buttonStyle: PropTypes.object
}

export default Toggle