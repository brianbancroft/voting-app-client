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
      votes: {},
      adminPresent: false,
      selectedStage: 0,
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

    socket.on('set-voting-stage', selectedStage => {
      this.setState({ selectedStage })
    })

    socket.on('error', e => {
      console.error('Error detected', e)
      this.setState({ error: true })
    })

    socket.on('disconnect', () => {
      console.warn('disconnected')
      this.setState({ connected: false })
    })

    socket.on('admin-enter', () => {
      if (this.votingStages[this.state.selectedStage] === 'Waiting for host') {
        this.setState({
          selectedStage: this.votingStages.indexOf('Waiting for question'),
        })
      }
      this.setState({ adminPresent: true })
    })
    socket.on('admin-exit', () => {
      this.setState({ adminPresent: false })
    })

    socket.on(
      'initial-context',
      ({
        selectedVotingStage: selectedStage,
        selectedQuestion: { question, answers },
        votes,
        selectedQuestionIndex,
      }) => {
        this.setState({
          selectedStage,
          question,
          answers,
          votes,
          selectedQuestionIndex,
        })
      },
    )
  }

  votingStages = [
    'Waiting for host',
    'Waiting for question',
    'Waiting to vote',
    'Voting active',
    'Voting ended',
    'Votes revealed',
  ]

  sendVote = index => {
    socket.emit('vote', index)
  }

  setAdminPresent = present => {
    socket.emit(present ? 'admin-enter' : 'admin-exit')
  }

  setSelectedStage = selectedStage => {
    socket.emit('set-voting-stage', selectedStage)
  }

  setActiveQuestion = selectedQuestionIndex => {
    socket.emit('set-active-question', { questionIndex: selectedQuestionIndex })
    this.setState({ selectedQuestionIndex })
  }

  render() {
    const {
      sendVote,
      setAdminPresent,
      setActiveQuestion,
      setSelectedStage,
      votingStages,
    } = this

    return (
      <SocketContext.Provider
        value={{
          ...this.state,
          sendVote,
          setAdminPresent,
          setActiveQuestion,
          setSelectedStage,
          votingStages,
        }}
      >
        {this.props.children}
      </SocketContext.Provider>
    )
  }
}

export default SocketContextProvider
