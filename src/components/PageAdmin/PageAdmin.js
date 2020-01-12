import React, { Component } from 'react'
import { Box, Text, Heading, Form, FormField, Button } from 'grommet'
import { ConfigStageDisplay } from '..'

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
                {questionList.map(({ question, answers }) => (
                  <Box className="question-element">
                    <Box width="medium">
                      <FormField label={question} />
                    </Box>
                    {answers.map(answer => (
                      <Box width="small">
                        <FormField label={answer} />
                      </Box>
                    ))}

                    <Box direction="row">
                      <Box width="small">
                        <FormField label="(disabled) Another Answer" disabled />
                      </Box>
                      <Button
                        onClick={() => {
                          console.log('Add answer selected')
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
