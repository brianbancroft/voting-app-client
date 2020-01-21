import React, { useState, useEffect } from 'react'
import { Box, Button, Heading, Text } from 'grommet'

const SectionVoting = ({ question, answers, selectResponse, canVote }) => {
  const [voted, setVoted] = useState(null)

  // Reset voted when question reset
  useEffect(() => {
    setVoted(null)
  }, [question])

  const AnswerButton = (answer, index) => {
    return (
      <Box margin="4px">
        <Button
          onClick={() => {
            selectResponse(index)
            setVoted(answer)
          }}
          key={index}
          disabled={!canVote}
          round="small"
        >
          <Box
            height="small"
            width="medium"
            background={`accent-${index + 1}`}
            round="small"
            elevation="small"
            justify="center"
            align="center"
          >
            <Text size="large" weight="bold" color="dark-2">
              {answer}
            </Text>
          </Box>
        </Button>
      </Box>
    )
  }

  return (
    <>
      <Box direction="column" width="large" justify="start" align="start">
        <Heading level={4} margin="0">
          Question:
        </Heading>
        <Text size="medium">{question}</Text>
      </Box>
      <Box
        justify="start"
        align="start"
        direction="row"
        width="large"
        height="large"
        wrap
      >
        {answers.map(AnswerButton)}
      </Box>
      <Box
        round="small"
        elevation="medium"
        background="light-4"
        width="large"
        height="xxsmall"
        justify="center"
        align="center"
      >
        <Text color={canVote ? 'dark-2' : 'dark-6'}>
          {canVote
            ? 'Select your answer above'
            : voted
            ? `You selected "${voted}"`
            : "You can't vote just yet"}
        </Text>
      </Box>
    </>
  )
}

export default SectionVoting
