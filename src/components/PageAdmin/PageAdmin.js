import React, { useState, useCallback, useEffect } from 'react'
import { Box, Text, Heading, FormField, Button, TextInput } from 'grommet'
import {
  LoadingDisplayAdminPage,
  ErrorDisplayAdminPage,
  SectionChooseQuestion,
  SectionAdminVotingControls,
} from '..'
import { SocketContext } from '../../context'
import { get } from 'axios'
import { useContext } from 'react'

const url = 'http://localhost:4000/poll'

const PageAdmin = () => {
  document.title = 'Voting App - Admin Page'
  const [loading, setLoading] = useState(true)
  const [questionList, setQuestionList] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  const {
    setActiveQuestion,

    setAdminPresent,
    setSelectedStage,
    selectedStage,
    votingStages,
  } = useContext(SocketContext)

  const currentStage = votingStages[selectedStage]
  console.log('Current stage', currentStage)

  useEffect(() => {
    const loadData = async () => {
      const response = await get(url)
      const { data } = response
      setQuestionList(data)
      setLoading(false)
    }
    loadData()

    setAdminPresent(true)

    // Shut down when admin not present
    return () => {
      setAdminPresent(false)
    }
  }, [])

  useEffect(() => {
    if (
      selectedQuestion !== null &&
      ['Waiting for question'].indexOf(currentStage) !== -1
    ) {
      setSelectedStage(votingStages.indexOf('Waiting to vote'))
    }
    if (
      selectedQuestion === null &&
      ['Votes revealed', 'Waiting to vote'].indexOf(currentStage) !== -1
    ) {
      setSelectedStage(votingStages.indexOf('Waiting for question'))
    }
  }, [selectedQuestion])

  const questionSelectorActive =
    ['Waiting for question', 'Waiting to vote'].indexOf(currentStage) !== -1

  const votingResultsActive =
    ['Voting active', 'Voting ended', 'Votes revealed'].indexOf(
      currentStage,
    ) !== -1

  const canRevealVotes = currentStage === 'Voting ended'
  const canSelectQuestion = currentStage === 'Waiting for question'

  const preventQuestionReset =
    selectedQuestion === null ||
    ['Waiting to vote', 'Votes revealed'].indexOf(currentStage) === -1

  const setQuestionIndex = index => {
    setActiveQuestion(index)
    setSelectedQuestion(index)
  }

  return (
    <>
      {loading && <LoadingDisplayAdminPage />}
      {/* {error && <ErrorDisplayAdminPage />} */}
      {!loading && (
        <>
          <Box direction="column">
            <Box
              border={{ side: 'bottom', size: 'small', color: 'dark-2' }}
              pad="small"
            >
              <Box
                pad="large="
                direction="row"
                justify="around"
                margin={{ bottom: '2px' }}
              >
                {votingStages.map((stage, index) => (
                  <Button key={stage}>
                    <Box
                      pad="medium"
                      background={
                        index === selectedStage ? 'accent-5' : 'white'
                      }
                      border={{ size: 'small', color: 'dark-2' }}
                    >
                      {stage}
                    </Box>
                  </Button>
                ))}
              </Box>
            </Box>
            <Box
              pad="small"
              border={{ side: 'bottom', size: 'small', color: 'dark-2' }}
            >
              <Box height="medium">
                {questionSelectorActive && (
                  <>
                    <Box>
                      <Heading level={3}>Select your question</Heading>
                    </Box>
                    <SectionChooseQuestion
                      questions={questionList}
                      selectQuestion={index => {
                        setQuestionIndex(index)
                      }}
                      canSelectQuestion={canSelectQuestion}
                      selectedIndex={selectedQuestion}
                    />
                  </>
                )}
                {votingResultsActive && (
                  <>
                    <Box>
                      <Heading level={3}>Results for Question</Heading>
                    </Box>
                    <Box>Stuff goes here...</Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
          <SectionAdminVotingControls
            setSelectedStage={setSelectedStage}
            canRevealVotes={canRevealVotes}
            setQuestionIndex={setQuestionIndex}
            preventQuestionReset={preventQuestionReset}
            selectedQuestion={selectedQuestion}
            selectedStage={selectedStage}
          />
        </>
      )}
    </>
  )
}

export default PageAdmin
