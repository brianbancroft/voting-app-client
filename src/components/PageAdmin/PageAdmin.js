import React, { useState } from 'react'
import { Box, Text, Heading } from 'grommet'
import { ConfigStageDisplay } from '..'

const PageAdmin = () => {
  const [setupStage, setSetupStage] = useState(0)
  const stages = ['Set up questions', 'Voting']

  return (
    <>
      <Box direction="column">
        <Box>
          <Heading>Voting</Heading>
        </Box>
        <ConfigStageDisplay />
        <Box>Form goes here</Box>
      </Box>
    </>
  )
}

export default PageAdmin
