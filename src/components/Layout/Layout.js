import React from 'react'
import PropTypes from 'prop-types'
import { Header, Grid, Footer, Main, Text, Box } from 'grommet'
import { Link } from 'react-router-dom'

const Layout = ({ children }) => (
  <>
    <Main>
      <Grid rows={['xxsmall', '1fr', 'xsmall']} fill="vertical">
        <Header background="highlight">
          <Box pad="medium">
            <Link to="/">
              <Text>Voting App</Text>
            </Link>
          </Box>
        </Header>
        <Box overflow={{ vertical: 'scroll' }}>{children}</Box>
        <Footer background="brand">
          <Box pad="medium">
            <Link to="/about">Learn More</Link>
          </Box>
        </Footer>
      </Grid>
    </Main>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
