import React from 'react'
import { Box, Text } from 'grommet'
import { LoadingIcon } from '.'

const LoadingDisplayAdminPage = () => (
  <Box
    direction="column"
    justify="center"
    align="center"
    pad="large"
    background="accent-2"
    height="large"
  >
    <Box margin={{ bottom: '25px' }}>
      <LoadingIcon />
    </Box>
    <Text size="24px" color="light-2">
      Loading...
    </Text>
  </Box>
)

export default LoadingDisplayAdminPage
