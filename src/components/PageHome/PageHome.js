import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, DataTable, Heading, Text, Meter } from 'grommet'
import { AnimatedEllipsis, VoteTable } from '..'
import { SocketContext } from '../../context'

const PageHome = () => {
  const {
    connected,
    question,
    answers,
    sendVote,
    votingActive,
    votes,
  } = useContext(SocketContext)
  const [voted, setVoted] = useState(false)

  // Allows user to vote again if voted
  useEffect(() => {
    setVoted(false)
  }, [question])

  const selectResponse = index => {
    setVoted(true)
    sendVote(index)
  }

  const AnswerButton = (answer, index) => {
    return (
      <Button
        onClick={() => {
          selectResponse(index)
        }}
        key={index}
        disabled={!connected || !votingActive || voted}
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
        {answers.map(AnswerButton)}
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
      <VoteTable answers={answers} votes={votes} />
    </Box>
  )
}

export default PageHome
