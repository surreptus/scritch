import React from 'react'
import { Box, Stack, Container } from '@chakra-ui/react'
import Card from './Card'

import * as Types from 'types'

interface Props {
  cards: Types.Card[]
}

export default function Information ({ cards }: Props) {
  return (
    <Container position='fixed' bottom='0' maxH='128px' >
      <Stack position='relative' justify='center' direction='row'>
        {cards.map((card) => <Box
          transition='transform 0.125s ease'
          _hover={{
            transform: 'translateY(-1rem)'
          }} ><Card {...card} /></Box>)}
      </Stack>
    </Container>
  )
}
