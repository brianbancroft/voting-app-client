import React, { useEffect, useState } from 'react'
import { Box, Button, Heading, Text } from 'grommet'
import io from 'socket.io-client'
import { AnimatedEllipsis } from '..'

let socket = io('http://10.0.0.154:4000')
const PageHome = () => {
  const [canVote, setCanVote] = useState(true)
  const [connected, setConntected] = useState(false)
  const [connecting, setConnecting] = useState(true)
  const [choice, setChoice] = useState(null)
  const [question, setQuestion] = useState('No question set')
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    if (socket) {
      socket.on('change-question', ({ question, answers }) => {
        setQuestion(question)
        setAnswers(answers)
      })

      socket.on('error', payload => {
        console.error('Error in socket ', payload)
      })

      socket.on('connect', () => {
        setConntected(true)
        setConnecting(false)
      })

      socket.on('disconnect', () => {
        console.log('disconnected')
      })
    }
  }, [socket])

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', {
        message: 'test test test',
      })
    }
  }

  const vote = userVote => {
    setCanVote(false)
    setChoice(userVote)
    sendMessage()
  }

  const Answer = (answer, index) => {
    return (
      <Button onClick={() => {}} key={index}>
        <Box height="xsmall" width="small" background="accent-2">
          {answer}
        </Box>
      </Button>
    )
  }

  return (
    <Box border={{ size: 'small', color: 'highlight' }} pad="large">
      <Heading size="h2">{question}</Heading>
      {choice && <Box>Vote Choice: {choice} </Box>}
      <Box
        justify="between"
        border={{ size: 'small', color: 'dark-2' }}
        direction="row"
        width="large"
      >
        {answers.map(Answer)}
      </Box>
      {!connected && connecting && (
        <Box margin={{ top: '20px' }}>
          <Text>
            <AnimatedEllipsis>Connecting</AnimatedEllipsis>
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default PageHome
