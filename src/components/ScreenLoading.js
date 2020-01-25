import React from 'react'
import { Box, Heading, Text } from 'grommet'

const ScreenLoading = ({ notConnected }) => {
  const background = notConnected ? 'status-warning' : 'status-ok'

  return (
    <Box
      background={background}
      height="xlarge"
      pad="medium"
      justify="center"
      align="center"
    >
      <Box
        height="130px"
        width="medium"
        justify="around"
        direction="column"
        background="white"
        round="medium"
        pad="small"
        elevation="medium"
      >
        <Box>
          <Heading level={3} textAlign="center" margin={{ top: '5px' }}>
            {notConnected ? 'Waiting for Connection...' : 'You are connected'}
          </Heading>
        </Box>
        <Box>
          <Text textAlign="center">
            {notConnected ? 'One moment...' : 'Please wait for a question'}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default ScreenLoading
