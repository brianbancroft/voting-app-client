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
  const [messages, setMessages] = useState([])
  const [numMessages, setNumMessages] = useState(0)

  useEffect(() => {
    if (socket) {
      socket.on('message', payload => {
        setMessages([...messages, payload])
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

    document.title = `>>> ${numMessages} <<< `
  }, [socket, numMessages])

  const sendMessage = () => {
    if (socket)
      socket.emit('message', {
        message: 'test test test',
      })
    setMessages([...messages, { message: 'test test test' }])
    setNumMessages(numMessages + 1)
  }

  const vote = userVote => {
    setCanVote(false)
    setChoice(userVote)
    sendMessage()
  }

  return (
    <Box border={{ size: 'small', color: 'highlight' }} pad="large">
      <Heading size="h2">Hello Home</Heading>
      {choice && <Box>Vote Choice: {choice} </Box>}
      <Box
        justify="between"
        border={{ size: 'small', color: 'dark-2' }}
        direction="row"
        width="large"
      >
        <Button onClick={() => vote('Choice A')} disabled={!canVote}>
          <Box height="xsmall" width="small" background="accent-2">
            Choice A
          </Box>
        </Button>
        <Button onClick={() => vote('Choice B')} disabled={!canVote}>
          <Box height="xsmall" width="small" background="accent-3">
            Choice B
          </Box>
        </Button>
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
