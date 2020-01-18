import React, { Component } from 'react'
import { Box, Text, Heading, FormField, Button, TextInput } from 'grommet'
import { Add, Trash, Troubleshoot } from 'grommet-icons'
import {
  ConfigStageDisplay,
  LoadingIcon,
  QuestionAnswerForm,
  SectionAdminActiveVoting,
} from '..'
import { get, post } from 'axios'

const maxNumberQuestions = 18
const maxNumberAnswers = 4

class PageAdmin extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      error: false,
      editMode: true,
      questionList: [],
      selectedQuestion: 0,
    }
  }

  async componentDidMount() {
    const url = 'http://localhost:4000/poll'

    const response = await get(url).catch(e => {
      console.error(e)
      this.setState({ error: true, loading: false })
    })

    const { data: questionList } = response

    this.setState({
      loading: false,
      questionList,
    })
  }

  setEditMode = editMode => {
    const url = 'http://localhost:4000/poll'
    const { questionList } = this.state

    this.setState({ editMode })
    if (!editMode) {
      post(url, questionList)
    }
  }

  addQuestion = () => {
    const { questionList } = this.state

    this.setState({
      questionList: [
        ...questionList,
        {
          question: '',
          answers: ['', ''],
        },
      ],
    })
  }

  addAnswer = ({ questionIndex }) => {
    const { questionList } = this.state

    questionList[questionIndex] = {
      ...questionList[questionIndex],
      answers: [...questionList[questionIndex].answers, ''],
    }

    this.setState({ questionList })
  }

  removeQuestion = ({ questionIndex }) => {
    const { questionList } = this.state

    questionList.splice(questionIndex, 1)
    this.setState({ questionList })
  }

  removeAnswer = ({ questionIndex, answerIndex }) => {
    const { questionList } = this.state

    questionList[questionIndex].answers.splice(answerIndex, 1)
    this.setState({ questionList })
  }

  editQuestion = ({ questionIndex, value }) => {
    const { questionList } = this.state

    questionList[questionIndex].question = value

    this.setState({ questionList })
  }

  editAnswer = ({ questionIndex, answerIndex, value }) => {
    const { questionList } = this.state

    questionList[questionIndex].answers[answerIndex] = value

    this.setState({ questionList })
  }

  render() {
    document.title = 'Voting App - Admin Page'
    const {
      questionList,
      editMode,
      loading,
      error,
      selectedQuestion,
    } = this.state

    return (
      <>
        {loading && (
          <Box
            direction="column"
            justify="center"
            align="center"
            pad="large"
            background="accent-2"
            height="large"
          >
            <Box margin={{ bottom: '25px' }}>
              <LoadingIcon />
            </Box>
            <Text size="24px" color="light-2">
              Loading...
            </Text>
          </Box>
        )}
        {error && (
          <Box
            direction="column"
            justify="center"
            align="center"
            pad="large"
            background="accent-2"
            height="large"
          >
            <Box margin={{ bottom: '25px' }}>
              <Troubleshoot size="large" color="light-2" />
            </Box>
            <Text size="24px" color="light-2">
              Sorry, an error occured obtaining data from the backend...
            </Text>
          </Box>
        )}
        {!loading && !error && (
          <>
            <Box direction="column">
              <ConfigStageDisplay
                setEditMode={this.setEditMode}
                status={editMode}
              />
              <Box>
                <Box direction="row" overflow={{ horizontal: 'scroll' }}>
                  {questionList.map(({ question, answers }, questionIndex) => (
                    <Box
                      className="question-element"
                      direction="column"
                      key={questionIndex}
                      width={{ min: '250px', max: 'large' }}
                      margin="5px"
                      border={{ size: 'small', color: 'dark-4' }}
                    >
                      <Box width="medium">
                        <FormField label={`Question ${questionIndex + 1}`}>
                          <TextInput
                            label="test"
                            type="text"
                            value={question}
                            onChange={({ target: { value } }) =>
                              this.editQuestion({ value, questionIndex })
                            }
                            disabled={!editMode}
                          />
                        </FormField>
                      </Box>
                      {answers.map((answer, answerIndex) => (
                        <QuestionAnswerForm
                          key={answerIndex}
                          answers={answers}
                          answer={answer}
                          editMode={editMode}
                          editAnswer={this.editAnswer}
                          removeAnswer={this.removeAnswer}
                          removeQuestion={this.removeQuestion}
                          questionIndex={questionIndex}
                          answerIndex={answerIndex}
                        />
                      ))}

                      {editMode &&
                        questionList[questionIndex].answers.length <
                          maxNumberAnswers && (
                          <Box
                            background="accent-4"
                            align="center"
                            justify="center"
                          >
                            <Button
                              onClick={() => {
                                this.addAnswer({ questionIndex })
                              }}
                            >
                              <Box
                                width="small"
                                pad="small"
                                direction="column"
                                justify="center"
                                align="center"
                                border={{ size: 'small', color: 'dark-3' }}
                                margin="5px"
                              >
                                <Box margin={{ bottom: '10px' }}>
                                  <Add />
                                </Box>
                                <Text>Add Answer</Text>
                              </Box>
                            </Button>
                          </Box>
                        )}
                      {editMode && (
                        <Button
                          onClick={() => this.removeQuestion({ questionIndex })}
                        >
                          <Box
                            justify="center"
                            align="center"
                            pad="small"
                            background="status-critical"
                            color="light-2"
                          >
                            <Box margin={{ bottom: '5px' }}>
                              <Trash size="small" />
                            </Box>
                            <Text>Remove Question</Text>
                          </Box>
                        </Button>
                      )}
                      {!editMode && (
                        <>
                          {selectedQuestion === questionIndex ? (
                            <Box
                              pad="small"
                              direction="row"
                              justify="center"
                              background="accent-4"
                            >
                              <Text>Selected</Text>
                            </Box>
                          ) : (
                            <Button
                              onClick={() => {
                                this.setState({
                                  selectedQuestion: questionIndex,
                                })
                              }}
                            >
                              <Box
                                pad="small"
                                background="accent-1"
                                direction="row"
                                justify="center"
                              >
                                <Text>Select for Voting</Text>
                              </Box>
                            </Button>
                          )}
                        </>
                      )}
                    </Box>
                  ))}

                  {editMode && questionList.length < maxNumberQuestions && (
                    <Box
                      background="brand"
                      align="center"
                      justify="center"
                      width={{ min: '250px', max: 'large' }}
                    >
                      <Button onClick={this.addQuestion}>
                        <Box
                          width="small"
                          pad="medium"
                          direction="column"
                          justify="center"
                          align="center"
                          border={{ size: 'small', color: 'dark-3' }}
                          margin="5px"
                        >
                          <Box margin={{ bottom: '10px' }}>
                            <Add />
                          </Box>
                          <Text>Add Question</Text>
                        </Box>
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
              {!editMode && (
                <SectionAdminActiveVoting
                  questionIndex={selectedQuestion}
                  questionObj={questionList[selectedQuestion]}
                />
              )}
            </Box>
          </>
        )}
      </>
    )
  }
}

export default PageAdmin
