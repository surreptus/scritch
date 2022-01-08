import React from 'react'
import { Text, Box } from '@chakra-ui/react'
import { Suit, Value } from 'types'

interface Props {
  value: Value;
  suit: Suit;
}

interface ColorMap {
  [key: string]: string
}

const COLOR_MAP: ColorMap = {
  spades: 'black',
  hearts: 'red',
  diamonds: 'red',
  clubs: 'black'
}

export default function Card ({ value, suit }: Props) {
  return (
    <Box borderRadius='5px' bg='white' height='128px' spacing={0} color={COLOR_MAP[suit]} p='4' width='96px' boxShadow='0 2px 4px 0 rgba(0,0,0,0.16)'>
      <Text>
      {value}
      </Text>

      <Text fontSize='xs'>
      {suit}
      </Text>
    </Box>
  )
}
