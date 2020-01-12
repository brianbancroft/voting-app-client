import React, { useEffect, useState } from 'react'
import { Box, Button, Header, Grid, Footer, Main } from 'grommet'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

const Layout = () => {
  const [canVote, setCanVote] = useState(true)
  const [choice, setChoice] = useState(null)
  const [messages, setMessages] = useState([])
  const [numMessages, setNumMessages] = useState(0)

  useEffect(() => {
    socket.on('message', payload => {
      setMessages([...messages, payload])
    })
    document.title = `>>> ${numMessages} <<< `
  }, [numMessages])

  const sendMessage = () => {
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
    <>
      <Main>
        <Grid rows={['xxsmall', '1fr', 'xsmall']} fill="vertical">
          <Header background="highlight">Votijng app</Header>
          <Box border={{ size: 'small', color: 'highlight' }} pad="large">
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
          <Footer background="brand">Learn More</Footer>
        </Grid>
      </Main>
    </>
  )
}

export default Layout
