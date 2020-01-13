import React, { Component } from 'react'
import { Box, Text, Heading, FormField, Button, TextInput } from 'grommet'
import { Add } from 'grommet-icons'
import { ConfigStageDisplay } from '..'

const maxNumberQuestions = 8
const maxNumberAnswers = 4

class PageAdmin extends Component {
  constructor() {
    super()
    this.state = {
      editMode: true,
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

  setEditMode = editMode => this.setState({ editMode })

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

  editQuestion = ({ questionIndex, value }) => {
    const { questionList } = this.state

    questionList[questionIndex].question = value
    this.setState({ questionList })
  }

  editAnswer = ({ questionIndex, answerIndex, event }) => {
    const { questionList } = this.state

    questionList[questionIndex].answers[answerIndex] = event
    this.setState({ questionList })
  }

  render() {
    const { questionList, editMode } = this.state

    return (
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
                  key={questionIndex}
                  width={{ min: '250px', max: 'large' }}
                  margin="5px"
                  border={{ size: 'small', color: 'dark-4' }}
                >
                  <Box width="medium">
                    {/* <FormField label={`Question ${questionIndex + 1}`}> */}
                    <TextInput
                      label="test"
                      type="text"
                      value={question}
                      onChange={({ target: { value } }) =>
                        this.editQuestion({ value, questionIndex })
                      }
                      disabled={!editMode}
                    />
                    {/* </FormField> */}
                  </Box>
                  {answers.map((answer, answerIndex) => (
                    <Box width="small" key={`${answerIndex}-${questionIndex}`}>
                      <FormField label={`Answer ${answerIndex + 1}`}>
                        <TextInput
                          value={answer}
                          disabled={!editMode}
                          onChange={({ target: { value } }) =>
                            this.editAnswer({
                              value,
                              questionIndex,
                              answerIndex,
                            })
                          }
                        />
                      </FormField>
                    </Box>
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
        </Box>
      </>
    )
  }
}

export default PageAdmin
