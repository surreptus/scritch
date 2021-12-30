import React from 'react'
import { Box } from '@chakra-ui/react'

import Hand from 'components/Hand'
import Information from 'components/Information'
import { useGame } from 'contexts/game'
import { Card } from 'types'

const CARDS: Card[] = [{
  value: 10,
  suit: 'spades'
},
{
  value: 5,
  suit: 'hearts'
}]

export default function Play () {
  const { round, currentPlayer } = useGame()

  return (
    <Box bg='whitesmoke'>
      <Information round={round} />

      <Hand cards={CARDS} />
    </Box>
  )
}
