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
      votingOpen: false,
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
  }

  sendVote = index => {
    socket.emit('vote', index)
  }

  render() {
    const { sendVote } = this

    return (
      <SocketContext.Provider value={{ ...this.state, sendVote }}>
        {this.props.children}
      </SocketContext.Provider>
    )
  }
}

export default SocketContextProvider
