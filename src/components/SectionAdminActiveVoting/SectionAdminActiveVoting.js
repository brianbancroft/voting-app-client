import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Heading, List, Text } from 'grommet'
/*
  Administers active voting

*/

import io from 'socket.io-client'
let socket

const SectionAdminActiveVoting = ({ questionObj, questionIndex }) => {
  const { question, answers } = questionObj
  const [votingActive, setVotingActive] = useState(false)
  // const [voteCount, setVoteCount] = useState(new Array(answers.length).fill(0))
  const [connected, setConnected] = useState(false)
  // Configure and tear down websockets on mount and dismount
  useEffect(() => {
    socket = io('http://10.0.0.154:4000')
    console.log('Use effect triggere for admin voting section ')
    socket.on('connect', () => {
      console.log('Connection detected')

      setConnected(true)
      socket.emit('admin-enter')
    })
    socket.on('disconnect', () => {
      console.log('disconnect detected')
    })
    socket.on('event', e => {
      console.log('Event detected')
    })

    // Actions on teardown
    return () => {
      if (connected) {
        socket.emit('admin-leave')
      }
    }
  })

  // Set question to user
  useEffect(() => {
    setVotingActive(false)
    socket.emit('set-active-question', { questionIndex })
  }, [questionIndex])

  // Toggle between when voting is active and inactive
  useEffect(() => {
    if (connected) {
      socket.emit('set-voting-active')
    }
  }, [votingActive])

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
