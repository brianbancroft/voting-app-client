import React from 'react'
import { Box, DataTable, Text, Meter } from 'grommet'

const VoteTable = ({ answers, votes }) => {
  if (!answers) {
    return <></>
  } else {
    const add = (total, num) => total + num
    const votesList = Object.values(votes)
    const totalVotes = votesList.length > 0 ? votesList.reduce(add) : 0

    const tableAnswers = answers.map((answer, index) => {
      console.log(votes[index] ? (100 * votes[index]) / totalVotes : 0)
      return {
        answer,
        votes: votes[index] || 0,
        pct: votes[index] ? (1.25 * (100 * votes[index])) / totalVotes : 0,
        color: `accent-${index + 1}`,
      }
    })

    return (
      <>
        <DataTable
          columns={[
            { property: 'answer', header: <Text>Answer</Text>, primary: true },
            { property: 'votes', header: <Text>Votes</Text> },
            {
              property: 'pct',
              header: <Text>Vote Share</Text>,
              render: datum => (
                <Box
                  // pad={{ vertical: 'xsmall' }}
                  elevation="medium"
                  border={{ color: 'dark-5', size: 'small' }}
                >
                  <Meter
                    values={[{ value: datum.pct, color: datum.color }]}
                    thickness="small"
                    size="small"
                    background="light-2"
                  />
                </Box>
              ),
            },
          ]}
          data={tableAnswers}
        />
      </>
    )
  }
}

VoteTable.defaultProps = {
  votes: {},
  answers: [],
}
export default VoteTable
