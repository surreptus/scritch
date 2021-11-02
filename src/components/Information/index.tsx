import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'

export default function Information () {
  return (
    <Grid templateColumns='repeat(3, 1fr)'>
      <GridItem>
        Score
      </GridItem>

      <GridItem align='center'>
        Round 2
      </GridItem>

      <GridItem align='right'>
        Tricks Bet
      </GridItem>
    </Grid>
  )
}
