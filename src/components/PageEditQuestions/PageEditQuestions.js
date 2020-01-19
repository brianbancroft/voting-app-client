import React, { Component } from 'react'
import { Box, Text, Heading, FormField, Button, TextInput } from 'grommet'
import { Add, Trash, Troubleshoot } from 'grommet-icons'
import { LoadingIcon, QuestionAnswerForm } from '..'
import { get, post } from 'axios'

const maxNumberQuestions = 18
const maxNumberAnswers = 4

const url = 'http://localhost:4000/poll'
class PageAdmin extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      error: false,
      questionList: [],
      selectedQuestion: 0,
    }
  }

  async componentDidMount() {
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

  save = () => {
    post(url, this.state.questionList)
  }

  reset = async () => {
    this.setState({ loading: true })

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
    const { questionList, loading, error, selectedQuestion } = this.state

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
                          />
                        </FormField>
                      </Box>
                      {answers.map((answer, answerIndex) => (
                        <QuestionAnswerForm
                          key={answerIndex}
                          answers={answers}
                          answer={answer}
                          editAnswer={this.editAnswer}
                          removeAnswer={this.removeAnswer}
                          removeQuestion={this.removeQuestion}
                          questionIndex={questionIndex}
                          answerIndex={answerIndex}
                        />
                      ))}

                      {questionList[questionIndex].answers.length <
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
                      {
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
                      }
                    </Box>
                  ))}

                  {questionList.length < maxNumberQuestions && (
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
              <Box
                direction="row"
                justify="around"
                width="medium"
                margin="20px auto 0 auto"
              >
                <Button onClick={() => this.save()}>
                  <Box background="accent-2" pad="small">
                    <Text>Save</Text>
                  </Box>
                </Button>
                <Button onClick={() => this.reset()}>
                  <Box background="accent-3" pad="small">
                    <Text>Reset</Text>
                  </Box>
                </Button>
              </Box>
            </Box>
          </>
        )}
      </>
    )
  }
}

export default PageAdmin
