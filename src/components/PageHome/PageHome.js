import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, Heading, Text } from 'grommet'
import { AnimatedEllipsis } from '..'
import { SocketContext } from '../../context'

const PageHome = () => {
  const { connected, question, answers, votingActive } = useContext(
    SocketContext,
  )
  const [voted, setVoted] = useState(false)

  // Allows user to vote again if voted
  useEffect(() => {
    setVoted(false)
  }, [question])

  const Answer = (answer, index) => {
    return (
      <Button
        onClick={() => {}}
        key={index}
        disabled={connected && !votingActive}
      >
        <Box height="xsmall" width="small" background="accent-2">
          {answer}
        </Box>
      </Button>
    )
  }

  return (
    <Box border={{ size: 'small', color: 'highlight' }} pad="large">
      <Heading size="h2">{question}</Heading>
      <Box
        justify="between"
        border={{ size: 'small', color: 'dark-2' }}
        direction="row"
        width="large"
      >
        {answers.map(Answer)}
      </Box>
      {!connected && (
        <Box margin={{ top: '20px' }}>
          <Text>
            <AnimatedEllipsis>Connecting</AnimatedEllipsis>
          </Text>
        </Box>
      )}
      {connected && votingActive ? (
        <Box margin={{ top: '20px' }}>
          <Text>
            <Text>Voting Active</Text>
          </Text>
        </Box>
      ) : (
        <Box margin={{ top: '20px' }}>
          <Text>
            <Text>Voting not Active</Text>
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default PageHome
