import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Heading, List, Text } from 'grommet'
import { SocketContext } from '../../context'
/*
  Administers active voting

*/

const SectionAdminActiveVoting = ({ questionObj, questionIndex }) => {
  const {
    connected,
    error,
    votingActive,
    setVotingActive,
    setAdminPresent,
    setActiveQuestion,
  } = useContext(SocketContext)
  const { question, answers } = questionObj
  // const [voteCount, setVoteCount] = useState(new Array(answers.length).fill(0))

  useEffect(() => {
    setAdminPresent(true)

    // Actions on teardown
    return () => {
      setAdminPresent(false)
    }
  })

  // Set question to user
  useEffect(() => {
    setVotingActive(false)
    setActiveQuestion(questionIndex)
  }, [questionIndex])

  return (
    <Box direction="column">
      <Heading level={1}>Votes for "{question}"</Heading>

      <Box direction="row" justify="between" width="80vw" margin="auto">
        <Box direction="column">
          <Box direction="row">
            {/* <List data={answers} />
            <List data={[0, 0]} /> */}
          </Box>
          <Box>
            {votingActive ? (
              <Text>Voting is Live</Text>
            ) : (
              <Text>Voting is Disabled</Text>
            )}
          </Box>
        </Box>
        <Box justify="around">
          <Button
            onClick={() => setVotingActive(true)}
            disabled={votingActive || !connected}
          >
            <Box
              border={{ size: 'medium', color: 'dark-4' }}
              pad="medium"
              margin="5px"
            >
              Turn on Voting
            </Box>
          </Button>
          <Button
            onClick={() => setVotingActive(false)}
            disabled={!votingActive || !connected}
          >
            <Box
              border={{ size: 'medium', color: 'dark-4' }}
              pad="medium"
              margin="5px"
            >
              Turn off Voting
            </Box>
          </Button>
        </Box>
      </Box>
      <Box>
        <Text>Current status: {connected ? 'Connected' : 'Not Connected'}</Text>
      </Box>
    </Box>
  )
}

SectionAdminActiveVoting.propTypes = {
  questionObj: PropTypes.shape({
    question: PropTypes.string,
    answer: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}

export default SectionAdminActiveVoting
