import React from 'react'
import PropTypes from 'prop-types'
import { Main, Box } from 'grommet'

const Layout = ({ children }) => (
  <>
    <Main>
      <Box overflow={{ vertical: 'scroll' }}>{children}</Box>
    </Main>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
