import React from 'react'
import { Message } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const ErrorMessage = ({ header, content }) => (
  <Message error
    header={header || 'Error'}
    content={content}
  />
)

ErrorMessage.propTypes = {
  header: PropTypes.string,
  content: PropTypes.string.isRequired
}

export default ErrorMessage