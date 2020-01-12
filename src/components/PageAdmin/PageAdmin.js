import React, { Component } from 'react'
import { Box, Text, Heading, Form, FormField, Button, TextInput } from 'grommet'
import { ConfigStageDisplay } from '..'
import { Add } from 'grommet-icons'

const maxNumberQuestions = 8
const maxNumberAnswers = 4

class PageAdmin extends Component {
  constructor() {
    super()
    this.state = {
      questionList: [
        {
          question: 'Text for the first question',
          answers: ['Answer 1', 'Answer 2'],
        },
        {
          question: 'Text for the second question',
          answers: ['Answer 1', 'Answer 2'],
        },
      ],
    }
  }

  addQuestion = () => {
    const { questionList } = this.state

    this.setState({
      questionList: [
        ...questionList,
        {
          question: 'What is the question?',
          answers: ['Answer 1', 'Answer 2'],
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

  removeQuestion = ({ questionIndex }) => {}

  removeAnswer = ({ questionIndex, answerIndex }) => {}

  editQuestion = ({ questionIndex, event }) => {}

  editAnswer = ({ questionIndex, answerIndex, event }) => {}

  render() {
    const { questionList } = this.state

    return (
      <>
        <Box direction="column">
          <Box>
            <Heading level={3}>Voting</Heading>
          </Box>
          <ConfigStageDisplay />
          <Box>
            <Form
              onSubmit={e => {
                console.log('Form submitted3')
              }}
            >
              <Box direction="row" overflow={{ horizontal: 'scroll' }}>
                {questionList.map(({ question, answers }, questionIndex) => (
                  <Box
                    className="question-element"
                    key={question}
                    width={{ min: '250px', max: 'large' }}
                    margin="5px"
                    border={{ size: 'small', color: 'dark-4' }}
                  >
                    <Box width="medium">
                      <FormField label={`Question ${questionIndex + 1}`}>
                        <TextInput value={question} />
                      </FormField>
                    </Box>
                    {answers.map((answer, answerIndex) => (
                      <Box
                        width="small"
                        key={`${answer}-${answerIndex}-${questionIndex}`}
                      >
                        <FormField label={`Answer ${answerIndex + 1}`}>
                          <TextInput value={answer} />
                        </FormField>
                      </Box>
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
                            <Text>Add Answer</Text>
                          </Box>
                        </Button>
                      </Box>
                    )}
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
            </Form>
          </Box>
        </Box>
      </>
    )
  }
}

export default PageAdmin
