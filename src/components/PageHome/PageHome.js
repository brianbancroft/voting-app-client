import React, { useEffect, useState } from 'react'
import { Box, Button, Heading } from 'grommet'
import io from 'socket.io-client'

let socket
const PageHome = () => {
  const [canVote, setCanVote] = useState(true)
  const [live, setLive] = useState(false)
  const [choice, setChoice] = useState(null)
  const [messages, setMessages] = useState([])
  const [numMessages, setNumMessages] = useState(0)

  useEffect(() => {
    if (live) socket = io('http://10.0.0.154:80')
  }, [live])

  useEffect(() => {
    socket.on('message', payload => {
      setMessages([...messages, payload])
    })
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
    </Box>
  )
}

export default PageHome
