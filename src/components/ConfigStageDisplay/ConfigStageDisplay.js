import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'grommet'

// eslint-disable-next-line
const ConfigStageDisplay = ({ status }) => (
  <Box
    direction="row"
    justify="around"
    border={{ color: 'dark-2', size: 'small' }}
    pad="medium"
  >
    <Box
      width="medium"
      height="xxsmall"
      justify="center"
      align="center"
      background="accent-2"
      border={{ color: 'accent-1', size: 'medium' }}
    >
      <Text>Question Setup</Text>
    </Box>
    <Box
      width="medium"
      height="xxsmall"
      justify="center"
      align="center"
      background="accent-2"
      border={{ color: 'accent-1', size: 'medium' }}
    >
      <Text>Voting Active</Text>
    </Box>
  </Box>
)

ConfigStageDisplay.propTypes = {
  status: PropTypes.number,
}

ConfigStageDisplay.defaultProps = {
  status: 0,
}

export default ConfigStageDisplay
