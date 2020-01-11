import React, { useState } from 'react'
import { Box, Button, Header, Grid, Footer, Main } from 'grommet'

const Layout = () => {
  const [canVote, setCanVote] = useState(true)
  const [choice, setChoice] = useState(null)

  const vote = choice => {
    setCanVote(false)
    setChoice(choice)
  }

  return (
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
              <Box
                height="xsmall"
                width="small"
                background="accent-2"
                border="dark-1"
              >
                Choice A
              </Box>
            </Button>
            <Button onClick={() => vote('Choice B')} disabled={!canVote}>
              <Box
                height="xsmall"
                width="small"
                background="accent-3"
                border="dark-1"
              >
                Choice B
              </Box>
            </Button>
          </Box>
        </Box>
        <Footer background="brand">Learn More</Footer>
      </Grid>
    </Main>
  )
}

export default Layout
