import React, { useState, useCallback, useEffect } from 'react'
import { Box, Text, Heading, FormField, Button, TextInput } from 'grommet'
import {
  LoadingDisplayAdminPage,
  ErrorDisplayAdminPage,
  SectionChooseQuestion,
} from '..'
import { SocketContext } from '../../context'
import { get } from 'axios'
import { useContext } from 'react'

const url = 'http://localhost:4000/poll'

const PageAdmin = () => {
  const [loading, setLoading] = useState(true)
  const [questionList, setQuestionList] = useState([])
  const votingStages = ['lobby', 'seeQuestion', 'voteOnQuestion', 'seeResults']
  const [selectedStage, setSelectedStage] = useState(0)
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  const {
    setActiveQuestion,
    votingActive,
    setVotingActive,
    setAdminPresent,
  } = useContext(SocketContext)

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

  const setQuestionIndex = index => {
    setActiveQuestion(index)
    setSelectedQuestion(index)
  }

  document.title = 'Voting App - Admin Page'

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
                  <Box
                    key={stage}
                    pad="medium"
                    background={index === selectedStage ? 'accent-5' : 'white'}
                    border={{ size: 'small', color: 'dark-2' }}
                  >
                    {stage}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              pad="small"
              border={{ side: 'bottom', size: 'small', color: 'dark-2' }}
            >
              <Box>
                <Heading level={3}>Select your question</Heading>
              </Box>
              <SectionChooseQuestion
                questions={questionList}
                selectQuestion={index => {
                  setQuestionIndex(index)
                }}
                selectedIndex={selectedQuestion}
              />
            </Box>
          </Box>
          <Box pad="small">
            <Box>
              <Heading level={3}>Voting Controls</Heading>
            </Box>
            <Box direction="row" justify="around">
              <Button
                onClick={() => setQuestionIndex(null)}
                disabled={selectedQuestion === null}
              >
                <Box pad="medium" background="accent-1">
                  <Text>
                    {selectedQuestion === null
                      ? 'Question not set'
                      : 'Reset Question'}
                  </Text>
                </Box>
              </Button>
              <Button
                disabled={votingActive || selectedQuestion === null}
                onClick={() => {
                  setVotingActive(true)
                  setSelectedStage(2)
                }}
              >
                <Box pad="medium" background="accent-1">
                  <Text>Reveal Question</Text>
                </Box>
              </Button>

              <Button
                disabled={votingActive || selectedQuestion === null}
                onClick={() => {
                  setVotingActive(true)
                  setSelectedStage(2)
                }}
              >
                <Box pad="medium" background="accent-1">
                  <Text>Start Voting</Text>
                </Box>
              </Button>
              <Button
                disabled={!votingActive}
                onClick={() => {
                  setVotingActive(false)
                  setSelectedStage(3)
                }}
              >
                <Box pad="medium" background="accent-1">
                  <Text>End Voting</Text>
                </Box>
              </Button>
              <Button>
                <Box pad="medium" background="accent-1">
                  <Text>Reveal Results</Text>
                </Box>
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export default PageAdmin
