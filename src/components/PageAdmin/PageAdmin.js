import React, { Component } from 'react'
import { Box, Text, Heading, Form, FormField, Button, TextInput } from 'grommet'
import { ConfigStageDisplay } from '..'
import { Add } from 'grommet-icons'

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
                  <Box className="question-element" key={question}>
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

                    <Box direction="row">
                      <Box width="small">
                        <FormField label="(disabled) Another Answer" disabled />
                      </Box>
                      <Button
                        onClick={() => {
                          this.addAnswer({ questionIndex })
                        }}
                      >
                        Add Answer
                      </Button>
                    </Box>
                  </Box>
                ))}

                <Box background="brand">
                  <Button onClick={this.addQuestion}>
                    <Text>Add Question</Text>
                  </Button>
                </Box>
              </Box>
            </Form>
          </Box>
        </Box>
      </>
    )
  }
}

export default PageAdmin
