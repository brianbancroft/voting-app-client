import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, Heading, Text } from 'grommet'
import { AnimatedEllipsis, VoteTable } from '..'
import { SocketContext } from '../../context'

const PageHome = () => {
  const {
    connected,
    question,
    answers,
    sendVote,
    votes,
    votingStages,
    selectedStage,
  } = useContext(SocketContext)
  const [voted, setVoted] = useState(false)
  const [choice, setChoice] = useState(null)

  const currentStage = votingStages[selectedStage]

  // Allows user to vote again if voted
  useEffect(() => {
    setVoted(false)
    setChoice(null)
  }, [question])

  const selectResponse = index => {
    setVoted(true)
    sendVote(index)
    setChoice(answers[index])
  }

  const AnswerButton = (answer, index) => {
    return (
      <Button
        onClick={() => {
          selectResponse(index)
        }}
        key={index}
        disabled={!connected || currentStage !== 'Voting active' || voted}
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
      {connected && currentStage === 'Voting active' ? (
        <Box margin={{ top: '20px' }}>
          <Text>
            <Text>Voting Active{choice && `. You selected "${choice}"`}</Text>
          </Text>
        </Box>
      ) : (
        <Box margin={{ top: '20px' }}>
          <Text>
            <Text>
              Voting not Active{choice && `. You selected "${choice}"`}
            </Text>
          </Text>
        </Box>
      )}
      {connected &&
        ['Voting ended', 'Votes revealed'].indexOf(currentStage) !== -1 && (
          <>
            <Heading level={3}>Results </Heading>
            <VoteTable
              answers={answers}
              votes={currentStage === 'Votes revealed' ? votes : {}}
            />
          </>
        )}
    </Box>
  )
}

export default PageHome
