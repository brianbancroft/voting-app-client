import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, Heading, Text } from 'grommet'
import { AnimatedEllipsis, VoteTable, SectionVoting } from '..'
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
  if (!initialConnection || !connected) background = 'status-warning'
  if (initialConnection && waitingForQuestion) background = 'status-ok'

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
    <>
      <Box
        background={background}
        height="xlarge"
        pad="medium"
        justify="center"
        align="center"
      >
        {!initialConnection ? (
          <Box
            height="small"
            width="small"
            justify="around"
            direction="column"
            background="white"
            round="medium"
            pad="small"
            elevation="medium"
          >
            <Box>
              <Heading level={3} textAlign="center" margin={{ top: '5px' }}>
                Waiting for Connection...
              </Heading>
            </Box>
            <Box>
              <Text textAlign="center">One moment...</Text>
            </Box>
          </Box>
        ) : (
          waitingForQuestion && (
            <Box
              height="small"
              width="small"
              justify="between"
              direction="column"
              background="white"
              round="medium"
              align="center"
              pad="medium"
              elevation="medium"
            >
              <Box>
                <Heading level={3} textAlign="center" margin={{ top: '5px' }}>
                  You are connected
                </Heading>
              </Box>
              <Box justify="center" align="center">
                <Text textAlign="center">Please wait for a question</Text>
              </Box>
            </Box>
          )
        )}

        {initialConnection && questionRevealed && (
          <SectionVoting
            canVote={canVote}
            answers={answers}
            selectResponse={selectResponse}
            question={question}
          />
        )}
        {initialConnection && viewResults && <>Results View</>}

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
    </>
  )
}

export default PageHome
