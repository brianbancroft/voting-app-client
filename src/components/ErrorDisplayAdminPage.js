import React from 'react'
import { Box, Text } from 'grommet'
import { Troubleshoot } from 'grommet-icons'

const ErrorDisplayAdminPage = () => (
  <Box
    direction="column"
    justify="center"
    align="center"
    pad="large"
    background="accent-2"
    height="large"
  >
    <Box margin={{ bottom: '25px' }}>
      <Troubleshoot size="large" color="light-2" />
    </Box>
    <Text size="24px" color="light-2">
      Sorry, an error occured obtaining data from the backend...
    </Text>
  </Box>
)

export default ErrorDisplayAdminPage
