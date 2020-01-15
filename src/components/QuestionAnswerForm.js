import React, { Component } from 'react'
import { Box, Text, Heading, FormField, Button, TextInput } from 'grommet'
import { Add, Trash, Troubleshoot } from 'grommet-icons'
import { ConfigStageDisplay, LoadingIcon } from '..'
import { get, post } from 'axios'

const maxNumberQuestions = 18
const maxNumberAnswers = 4

const QuestionAnswerForm = ({
  onChange,
  answers,
  answer,
  editMode,
  removeAnswer,
  editAnswer,
  removeQuestion,
  questionIndex,
  answerIndex,
}) => {
  return (
    <Box
      direction="row"
      border={{
        size: 'small',
        side: 'bottom',
        color: 'dark-3',
      }}
    >
      <Box width="small" key={`${answerIndex}-${questionIndex}`}>
        <FormField label={`Answer ${answerIndex + 1}`}>
          <TextInput
            value={answer}
            disabled={!editMode}
            onChange={event =>
              editAnswer({
                value: event.target.value,
                questionIndex,
                answerIndex,
              })
            }
          />
        </FormField>
      </Box>
      {editMode && answers.length > 2 && (
        <Button
          onClick={() => {
            removeAnswer({
              questionIndex,
              answerIndex,
            })
          }}
        >
          <Box pad="small">
            <Trash />
          </Box>
        </Button>
      )}
    </Box>
  )
}
export default QuestionAnswerForm
