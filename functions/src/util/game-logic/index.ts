import { Trump, Move } from '../../types'

const trump: Trump[] = [0, 1, 2, 3, 4];

const NUM_CARDS = 52;

const DECK = [...Array(NUM_CARDS).keys()]

export const calculateRounds = (numPlayers: number) =>
  Math.floor(52 / numPlayers);

type CardCarry = [number[], number[][]]
export const dealCards = (numPlayers: number, numCards: number): number[][] => {
  const players = [...Array(numPlayers).keys()]
  // Iterate numCards time through each player
  // and deal them each a random card each time
  const [, finalHands] = [...Array(numCards).keys()].reduce(([cardsLeft, hands]: CardCarry, index) => {
    const nextHand = players.map(i => {
      const rand = Math.floor(Math.random() * cardsLeft.length)
      const card = cardsLeft.splice(rand, 1)
      if (hands[i]) {
        return [...hands[i], ...card]
      } else {
        return card
      }
    })
    return [cardsLeft, nextHand]
  }, [[...DECK], []])

  return finalHands
}

export const nextTrump = (lastTrump: Trump): Trump => {
  const tIdx = trump.indexOf(lastTrump)
  return tIdx === trump.length - 1 ? trump[0] : trump[tIdx + 1]
}

export const nextStartPlayer = (lastPlayer: string, playerIds: string[]): string => {
  const pIdx = playerIds.findIndex(id => id == lastPlayer)
  return pIdx === playerIds.length - 1 ? playerIds[0] : playerIds[pIdx + 1]
}

export const getWinner = (trump: number, moves: Move[]) => {
  const winningMove = moves.reduce((bestMove, currentMove) => {
    if (!bestMove) {
      return currentMove
    } else {
      const winningSuit = getSuit(bestMove.card)
      const currentSuit = getSuit(currentMove.card)

      const winningValue = getValue(bestMove.card, winningSuit)
      const currentValue = getValue(currentMove.card, currentSuit)

      if (currentSuit === winningSuit && currentValue > winningValue) {
        return currentMove
      } else if (currentSuit === trump) {
        return currentMove
      }
      return bestMove
    }
  })

  return winningMove.playerId
}

// TODO: Move into shared util with FE code
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
  suit: typeof SUITS[number];
  value: typeof VALUES[number];
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

export const validateMove = (suitLed: number, move: number, hand: number[]): boolean => {
  // The player must play whatever suit is led if they have any
  const moveSuit = getSuit(move)
  if (moveSuit === suitLed) {
    return true
  } else {
    return hand.every((card) => getSuit(card) !== suitLed)
  }
}
