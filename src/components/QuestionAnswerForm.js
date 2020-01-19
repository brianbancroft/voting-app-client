import React from 'react'
import { Box, FormField, Button, TextInput } from 'grommet'
import { Trash } from 'grommet-icons'

const QuestionAnswerForm = ({
  answers,
  answer,
  removeAnswer,
  editAnswer,
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
      {answers.length > 2 && (
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
