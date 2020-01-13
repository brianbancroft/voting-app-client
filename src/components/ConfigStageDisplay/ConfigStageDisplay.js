import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Text } from 'grommet'

// eslint-disable-next-line
const ConfigStageDisplay = ({ status, setEditMode }) => (
  <Box
    direction="row"
    justify="around"
    border={{ color: 'dark-2', size: 'small' }}
    pad="medium"
  >
    <Button onClick={() => setEditMode(true)}>
      <Box
        width="medium"
        height="xxsmall"
        justify="center"
        align="center"
        background="accent-2"
        border={{ color: status ? 'accent-1' : 'dark-4', size: 'medium' }}
      >
        <Text>Edit Questions</Text>
      </Box>
    </Button>
    <Button onClick={() => setEditMode(false)}>
      <Box
        width="medium"
        height="xxsmall"
        justify="center"
        align="center"
        background="accent-2"
        border={{ color: status ? 'dark-4' : 'accent-1', size: 'medium' }}
      >
        <Text>Engage Voting</Text>
      </Box>
    </Button>
  </Box>
)

ConfigStageDisplay.propTypes = {
  status: PropTypes.number,
}

ConfigStageDisplay.defaultProps = {
  status: 0,
}

export default ConfigStageDisplay
