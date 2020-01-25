import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, Heading, Text } from 'grommet'
import { AnimatedEllipsis, VoteTable, SectionVoting, ScreenLoading } from '..'
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
    initialConnection,
  } = useContext(SocketContext)
  const [voted, setVoted] = useState(false)
  const [choice, setChoice] = useState(null)

  const currentStage = votingStages[selectedStage]

  const waitingForQuestion =
    ['Waiting for host', 'Waiting for question'].indexOf(currentStage) !== -1

  const questionRevealed =
    ['Waiting to vote', 'Voting active'].indexOf(currentStage) !== -1

  const viewResults =
    ['Voting ended', 'Votes revealed'].indexOf(currentStage) !== -1

  const canVote = connected && currentStage === 'Voting active' && !voted

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

  let background = 'light-4'

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

  if (!initialConnection) return <ScreenLoading notConnected />
  if (waitingForQuestion) return <ScreenLoading />

  return (
    <>
      <Box
        background="light-4"
        height="xlarge"
        pad="medium"
        justify="center"
        align="center"
      >
        {initialConnection && questionRevealed && (
          <SectionVoting
            canVote={canVote}
            answers={answers}
            selectResponse={selectResponse}
            question={question}
          />
        )}
        {connected &&
          ['Voting ended', 'Votes revealed'].indexOf(currentStage) !== -1 && (
            <Box margin={{ top: '-10vh' }}>
              <Heading level={2}>Voting ended. Results: </Heading>
              <Text>Question: </Text>
              <Text weight="bold">{question}</Text>
              <VoteTable
                answers={answers}
                votes={currentStage === 'Votes revealed' ? votes : {}}
              />
            </Box>
          )}
      </Box>
    </>
  )
}

export default PageHome
