import React, { Component } from 'react'
import io from 'socket.io-client'
import SocketContext from './SocketContext'

const socket = io('http://10.0.0.154:4000')
class SocketContextProvider extends Component {
  constructor() {
    super()
    this.state = {
      connected: false,
      error: false,
      question: '',
      answers: [],
      votingActive: false,
      adminPresent: false,
    }
  }

  componentDidMount() {
    socket.on('connect', () => {
      console.log('Context socket connected')
      this.setState({ connected: true })
    })

    socket.on('change-question', ({ question, answers }) => {
      this.setState({ question, answers })
    })

    socket.on('error', e => {
      console.error('Error detected', e)
      this.setState({ error: true })
    })

    socket.on('disconnect', () => {
      console.warn('disconnected')
      this.setState({ connected: false })
    })

    socket.on('set-voting-active', () => {
      console.log('Set voting active triggered')
      this.setState({ votingActive: true })
    })

    socket.on('set-voting-disabled', () => {
      this.setState({ votingActive: false })
    })

    socket.on('admin-enter', () => {
      this.setState({ adminPresent: true })
    })
    socket.on('admin-exit', () => {
      this.setState({ adminPresent: false })
    })
  }

  sendVote = index => {
    socket.emit('vote', index)
  }

  setAdminPresent = present => {
    socket.emit(present ? 'admin-enter' : 'admin-exit')
  }

  setVotingActive = active => {
    socket.emit(active ? 'set-voting-active' : 'set-voting-disabled')
  }

  setActiveQuestion = questionIndex => {
    socket.emit('set-active-question', { questionIndex })
  }

  render() {
    const {
      sendVote,
      setAdminPresent,
      setVotingActive,
      setActiveQuestion,
    } = this

    return (
      <SocketContext.Provider
        value={{
          ...this.state,
          sendVote,
          setAdminPresent,
          setVotingActive,
          setActiveQuestion,
        }}
      >
        {this.props.children}
      </SocketContext.Provider>
    )
  }
}

export default SocketContextProvider
