import React from 'react'
import { Container } from '@chakra-ui/react'

import { Card } from 'types'

interface Props {
  cards: Card[]
}

export default function Information ({ cards }: Props) {
  return (
    <Container>
      hand goes here
    </Container>
  )
}
