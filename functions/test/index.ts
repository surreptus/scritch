import {Player, Game, Round} from '../src/types'
import * as util from '../src/util/game-logic'

const players: Player[] = [
  {
    key: 'player1',
    name: 'Player1',
    gameId: 'game1'
  },
  {
    key: 'player2',
    name: 'Player2',
    gameId: 'game1'
  },
  {
    key: 'player3',
    name: 'Player3',
    gameId: 'game1'
  },
]

const createGame = (): Game => (
  {
    key: 'game1',
    players,
    rounds: []
  }
)

const startGame = (game: Game): Game => {
  const round1: Round = {
    key: 'round1',
    index: 0,
    gameId: 'game1',
    hands: [],
    bids: [],
    tricks: [],
    numCards: 1
  }

  return {...game, rounds: [round1]}
}

const dealHand = (round: Round): Round => {
  const hands = util.dealCards(players.length, round.numCards)
  round.hands = players.map((player, i) => (
    {
      playerId: player.key,
      cards: hands[i]
    }
  ))
  return round
}

// Should move on to next round if number of tricks is equal to the total cards in the round
const shouldDoNextRound = (round: Round): boolean => round.tricks.length === round.numCards

const nextTrick = (round: Round): Round => {
  const lastTrick = round.tricks[round.tricks.length - 1]
  const lastPlayer = lastTrick.startPlayer
  return {
    ...round,
    tricks: [
      ...round.tricks,
      {
        trump: util.nextTrump(lastTrick.trump),
        moves: [],
        startPlayer: util.nextStartPlayer(lastPlayer, players)
      }
    ]
  }
}

const bid = (round: Round, player: Player, bid: number): Round => {
  return {
    ...round,
    bids: [...round.bids, {playerId: player.key, bid}]
  }
}
