import { Trump, Player } from '../../types'

const NUM_CARDS = 52;

const DECK = [...Array(NUM_CARDS)].map(i => i)

const trump: Trump[] = ['club', 'heart', 'diamond', 'spade', 'none']

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

export const nextStartPlayer = (lastPlayer: string, players: Player[]): Player => {
  const pIdx = players.findIndex(p => p.key == lastPlayer)
  return pIdx === players.length - 1 ? players[0] : players[pIdx + 1]
}
