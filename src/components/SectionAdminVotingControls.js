import React from 'react'
import { Box, Button, Heading, Text } from 'grommet'

const SectionAdminVotingControls = ({
  setQuestionIndex,
  canRevealVotes,
  setSelectedStage,
  preventQuestionReset,
  selectedQuestion,
  selectedStage,
}) => {
  return (
    <Box pad="small">
      <Box>
        <Heading level={3}>Voting Controls</Heading>
      </Box>
      <Box direction="row" justify="around">
        <Button
          onClick={() => setQuestionIndex(null)}
          disabled={preventQuestionReset}
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
          disabled={selectedStage !== 2}
          onClick={() => {
            console.log('set selected stage triggere')
            setSelectedStage(3)
          }}
        >
          <Box pad="medium" background="accent-1">
            <Text>Start Voting</Text>
          </Box>
        </Button>
        <Button
          disabled={selectedStage !== 3}
          onClick={() => {
            setSelectedStage(4)
          }}
        >
          <Box pad="medium" background="accent-1">
            <Text>End Voting</Text>
          </Box>
        </Button>
        <Button
          onClick={() => {
            setSelectedStage(5)
          }}
          disabled={!canRevealVotes}
        >
          <Box pad="medium" background="accent-1">
            <Text>Reveal Results</Text>
          </Box>
        </Button>
      </Box>
    </Box>
  )
}

export default SectionAdminVotingControls
