import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, DataTable, Heading, Text, Meter } from 'grommet'

const VoteTable = (answers, votes) => {
  return <></>

  if (!answers || answers.length === 0) {
    return <></>
  } else {
    const add = (total, num) => total + num
    const totalVotes = Object.values(votes).reduce(add)

    const tableAnswers = answers.map((answer, index) => ({
      answer,
      votes: votes[index] || 0,
      pct: votes[index] ? (100 * votes[index]) / totalVotes : 0,
    }))

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
                <Box pad={{ vertical: 'xsmall' }}>
                  <Meter
                    values={[{ value: datum.pct }]}
                    thickness="small"
                    size="small"
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
