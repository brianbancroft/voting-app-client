/*

  App.js is used to control all React Context Providers

*/

import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Grommet } from 'grommet'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { SocketContextProvider } from './context'
import {
  Layout,
  PageHome,
  PageAbout,
  PageAdmin,
  PageEditQuestions,
} from './components'
import theme from './theme'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grommet theme={theme} full>
        <SocketContextProvider>
          <Router>
            <Layout>
              <Switch>
                <Route path="/admin">
                  <PageAdmin />
                </Route>
                <Route path="/about">
                  <PageAbout />
                </Route>
                <Route path="/edit-questions">
                  <PageEditQuestions />
                </Route>
                <Route path="/">
                  <PageHome />
                </Route>
              </Switch>
            </Layout>
          </Router>
        </SocketContextProvider>
      </Grommet>
    </ThemeProvider>
  )
}

export default App
