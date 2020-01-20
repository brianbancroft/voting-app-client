import React from 'react'
import { Box, Button, Text } from 'grommet'

const SectionChooseQuestion = ({
  questions,
  selectQuestion,
  selectedIndex,
  canSelectQuestion,
}) => (
  <Box direction="row" justify="around" wrap>
    {questions.map(({ question, answers }, index) => (
      <Button
        key={`${question}-${index}`}
        onClick={() => {
          selectQuestion(index)
        }}
        disabled={!canSelectQuestion || index === selectedIndex}
      >
        <Box
          direction="column"
          key={index}
          justify="between"
          width="small"
          height="small"
          border={{ size: 'small', color: 'dark-3' }}
          margin="5px"
        >
          <Box pad="small">{question}</Box>
          <Box
            pad="medium"
            background={index === selectedIndex ? 'dark-2' : 'accent-3'}
            justify="center"
            align="center"
          >
            <Text>Select</Text>
          </Box>
        </Box>
      </Button>
    ))}
  </Box>
)

SectionChooseQuestion.defaultProps = {
  questions: [],
  selectQuestion: () => {},
}

export default SectionChooseQuestion
