import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import {CurrentRound, Trump} from 'types'

interface Props {
  round: CurrentRound
}

export default function Information ({ round }: Props) {
  const numBidFor = Object.values(round.bids || {}).reduce((carry, curr) => (curr + carry), 0)
  return (
    <Grid color='white' templateColumns='repeat(3, 1fr)'>
      <GridItem>
        Score
      </GridItem>

      <GridItem align='center'>
        <div>Round {round.idx + 1}</div>
        <div>Trump: {Trump[round.trump]}</div>
      </GridItem>

      <GridItem align='right'>
        Tricks Bet {numBidFor}
      </GridItem>
    </Grid>
  )
}
