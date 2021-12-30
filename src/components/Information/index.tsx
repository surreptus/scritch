import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'

interface Props {
  round: number
}

export default function Information ({ round }: Props) {
  return (
    <Grid templateColumns='repeat(3, 1fr)'>
      <GridItem>
        Score
      </GridItem>

      <GridItem align='center'>
        Round {round}
      </GridItem>

      <GridItem align='right'>
        Tricks Bet
      </GridItem>
    </Grid>
  )
}
