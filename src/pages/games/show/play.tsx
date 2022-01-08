import React from 'react'
import { Box } from '@chakra-ui/react'

import Hand from 'components/Hand'
import Information from 'components/Information'
import { useGame, useCurrentHand, useCurrentRound } from 'contexts/game'
import { useLoggedInUser } from 'contexts/application'
import { Card } from 'types'

export default function Play () {
  const userId = useLoggedInUser()
  const currentRound = useCurrentRound()
  const currentHand = useCurrentHand(userId)

  return (
    <Box height='100vh' bg='navy'>
      <Information round={currentRound} />

      <Hand cards={currentHand} />
    </Box>
  )
}
