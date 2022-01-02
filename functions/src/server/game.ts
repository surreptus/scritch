import * as db from '../db/repository';
import {Player, Round, Trick} from '../types';
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

  const cards = util.dealCards(playerIds.length, numCards)
  const hands = cards.reduce((carry, hand, i) => {
    const playerId = playerIds[i]
    return {
      ...carry,
      [playerId]: hand
    }
  }, {})

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
  const bids = round.bids || {}
  const isLastBid = Object.keys(bids).length === Object.keys(game.players).length - 1
  const playerIndex = Object.keys(game.players).indexOf(playerId);
  const bidIndex = Object.keys(bids).length - 1

  if (playerIndex != bidIndex) {
    throw new Error('It is not this player\'s turn to bid')
  }

  const maxBids = round.numCards;
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

  if (isLastBid) {
    // If it's the last bid, create the first trick for the round
    const firstTrick: Trick = {
      moves: [],
      playerOrder: round.playerOrder,
    }
    await db.createTrick(firstTrick, roundId, gameId)
  }
}

export const play = async (gameId: string, roundId: string, trickId: string, playerId: string, move: number) => {
  const game = await db.findGame(gameId)
  const round = await db.findRound(gameId, roundId);

  const currentTrick = round.tricks[trickId]
  const suitLed = util.getSuit(currentTrick.moves[0].card)

  const isValidMove = util.validateMove(suitLed, move, round.hands[playerId])
  if (!isValidMove) {
    throw new Error('You must follow suit if possible')
  }

  await db.createMove([...currentTrick.moves, {playerId, card: move}], trickId, roundId, gameId)

  if (currentTrick.moves.length + 1 === Object.keys(game.players).length) {
    const winner = util.getWinner(round.trump, currentTrick.moves)
    await db.setWinner(winner, trickId, roundId, gameId)
    const nextPlayerOrder = [...currentTrick.playerOrder.slice(1), currentTrick.playerOrder[0]]
    const nextTrick: Trick = {
      playerOrder: nextPlayerOrder,
      moves: []
    }
    await db.createTrick(nextTrick, roundId, gameId)
  }
}
