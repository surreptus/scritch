import React from 'react'

import Hand from 'components/Hand'
import Information from 'components/Information'
import { Card } from 'types'

const CARDS: Card[] = [{
  value: 10,
  suit: 'spade'
}]

export default function Play () {
  return (
    <div>
      <Information />

      <Hand cards={CARDS} />
    </div>
  )
}
