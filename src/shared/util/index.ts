const SUITS = ['club', 'diamond', 'heart', 'spade'] as const
const VALUES = [
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'jack',
  'queen',
  'king',
  'ace'
] as const

export type Card = {
  suit: typeof SUITS[number]
  value: typeof VALUES[number]
}

export const getSuit = (cardNum: number): number => {
  return Math.floor(cardNum/52 * 4)
}

export const getValue = (cardNum: number, suitIndex: number): number => {
  return cardNum - (suitIndex * 13)
}

export const identifyCard = (cardNum: number): Card => {

  const suitIndex = getSuit(cardNum)
  const suit = SUITS[suitIndex]

  const valueIndex = getValue(cardNum, suitIndex)
  const value = VALUES[valueIndex]

  return { suit, value }
}
