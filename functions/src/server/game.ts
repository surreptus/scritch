import * as db from '../db/repository';
import {Player, Round, ScoreCount} from '../types';
import * as util from '../util/game-logic';

interface CreateGameResp {
  gameId: string;
  player: string;
}

interface JoinGameResp {
  playerId: string;
}

export const createGame = async (
  playerName: string,
): Promise<CreateGameResp> => {
  const game = await db.createGame();

  if (!game.key) {
    throw new Error(`Missing game ID`)
  }

  const playerData: Player = {
    name: playerName,
    points: 0,
  }

  const player = await db.createPlayer(playerData, game.key);

  if (!player.key) {
    throw new Error(`Missing player ID`);
  }

  return {gameId: game.key, player: player.key};
};

export const joinGame = async (
  playerName: string,
  gameId: string,
): Promise<JoinGameResp> => {
  const playerData: Player = {
    name: playerName,
    points: 0,
  }
  const player = await db.createPlayer(playerData, gameId);

  if (!player.key) {
    throw new Error(`Missing ID: playerId: ${player.key}`);
  }

  return {playerId: player.key};
};

export const startGame = async (gameId: string) => {
  const game = await db.findGame(gameId);

  const playerIds = [...Object.keys(game.players)]
  const numCards = 1

  const hands = util.deal(playerIds, numCards)

  const roundData: Round = {
    hands,
    trump: 0,
    tricks: {},
    bids: {},
    numCards: 1,
    playerOrder: playerIds,
  }

  await db.createRound(roundData, gameId)
};

export const bid = async (gameId: string, roundId: string, playerId: string, bid: number) => {
  const game = await db.findGame(gameId);
  const round = await db.findRound(gameId, roundId);
  const bidsLength = round.bids ? Object.keys(round.bids).length : 0
  const isLastBid = bidsLength === Object.keys(game.players).length - 1
  const playerIndex = round.playerOrder.indexOf(playerId);

  if (playerIndex != bidsLength) {
    throw new Error('It is not this player\'s turn to bid')
  }

  const maxBids = round.numCards;
  const bids = round.bids || {}
  const alreadyBid = Object.keys(bids).reduce((carry, curr) => {
    return carry + round.bids[curr]
  }, 0)

  if (playerId in bids) {
    throw new Error('Player has already bid')
  } else if (!(playerId in game.players)) {
    throw new Error('Not a valid player')
  }

  if (bid > maxBids) {
    throw new Error('Cannot bid more cards than in the round')
  } else if (isLastBid && (bid + alreadyBid === maxBids)) {
    // When the last player bids, the total bid cannot equal the number of cards
    throw new Error('The total number of bids must not equal the number of tricks in the round')
  }

  await db.createBid(bid, roundId, gameId, playerId)
}

export const createTrick = async (gameId: string, roundId: string) => {
  const game = await db.findGame(gameId)
  const round = await db.findRound(gameId, roundId);

  const tricks = round.tricks || {}
  const tricksArray = Object.keys(tricks).map(tId => round.tricks[tId])

  const currentTrick = tricksArray[tricksArray.length - 1]

  if (tricksArray.length - 1 === round.numCards) {
    throw new Error('The round is over, you must start a new round')
    return
  }
  if (currentTrick && !currentTrick.winner) {
    throw new Error('You must score the previous trick before starting a new one')
    return
  }

  // The next start player is either the winner of the last trick or the start player of the round
  const nextStartPlayer = currentTrick && currentTrick.winner ? currentTrick.winner : round.playerOrder[0]
  const nextPlayerOrder = util.getPlayerOrder(Object.keys(game.players), nextStartPlayer)

  const nextTrick = {
    moves: [],
    playerOrder: nextPlayerOrder
  }

  await db.createTrick(nextTrick, roundId, gameId)
}

export const play = async (gameId: string, roundId: string, trickId: string, playerId: string, card: number) => {
  const round = await db.findRound(gameId, roundId);

  const currentTrick = round.tricks[trickId]

  const moves = currentTrick.moves || []
  const currentMoveIndex = Object.keys(moves).length
  if (currentTrick.playerOrder.indexOf(playerId) !== currentMoveIndex) {
    throw new Error('It is not this player\'s turn')
  }

  const playerHasCard = round.hands[playerId].includes(card)
  if (!playerHasCard) {
    throw new Error('The player does not have this card in their hand')
  }

  const suitLed = moves.length > 0 && util.getSuit(moves[0].card)

  if (suitLed) {
    const isValidMove = util.validateMove(suitLed, card, round.hands[playerId])
    if (!isValidMove) {
      throw new Error('You must follow suit if possible')
    }
  }

  await db.createMove([...moves, {playerId, card: card}], trickId, roundId, gameId)
}

export const scoreTrick = async (gameId: string, roundId: string, trickId: string) => {
  const round = await db.findRound(gameId, roundId)

  const currentTrick = round.tricks[trickId]

  const moves = currentTrick.moves

  if (moves.length !== round.playerOrder.length) {
    throw new Error('All players must play a card to score the trick')
  }

  const winner = util.getTrickWinner(round.trump, moves)

  await db.setWinner(winner, trickId, roundId, gameId)
}

export const scoreRound = async (gameId: string, roundId: string) => {
  const round = await db.findRound(gameId, roundId)
  const scores = Object.keys(round.tricks).reduce((scoreCount: ScoreCount, trickId) => {
    const trick = round.tricks[trickId]
    if (!trick.winner) {
      throw new Error(`There is an unscored trick in the round, trickId: ${trickId}`)
    }
    const prevScore = scoreCount[trick.winner] || 0
    return {
      ...scoreCount,
      [trick.winner]: prevScore + 1
    }
  }, {})

  const points = Object.keys(round.bids).reduce((pointsCount: ScoreCount, playerId) => {
    const playerRoundPoints = scores[playerId] || 0
    const amountBid = round.bids[playerId]

    let totalPoints = 0
    if (playerRoundPoints === amountBid) {
      totalPoints = amountBid + 10
    }
    return {
      ...pointsCount,
      [playerId]: totalPoints
    }
  }, {})

  await db.setRoundPoints(gameId, roundId, points)
}

export const createRound = async (gameId: string) => {
  const game = await db.findGame(gameId)

  const roundKeysArray = Object.keys(game.rounds)

  const lastRound = await db.findRound(gameId, roundKeysArray[roundKeysArray.length - 1])

  const maxCards = util.getMaxCards(Object.keys(game.players).length)

  const nextCards = lastRound.numCards === maxCards
    ? lastRound.numCards - 1
    : lastRound.numCards + 1;

  // The next start player is the second player of the last round
  const nextPlayerOrder = util.getPlayerOrder(lastRound.playerOrder, lastRound.playerOrder[1])
  const nextTrump = util.getNextTrump(lastRound.trump, nextCards)
  const hands = util.deal(nextPlayerOrder, nextCards)

  const nextRound: Round = {
    hands,
    numCards: nextCards,
    playerOrder: nextPlayerOrder,
    trump: nextTrump,
    bids: {},
    tricks: {},
  }

  await db.createRound(nextRound, gameId)
}
