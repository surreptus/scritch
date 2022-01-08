import { SUITS, VALUES, Card } from 'types'

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
