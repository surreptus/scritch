import {
  ref,
  push,
  get,
  update,
  child,
  DatabaseReference,
} from '@firebase/database';

import {
  Player,
  Game,
  Round,
  Trick,
  Move,
  ScoreCount
} from '../types'

import { db } from '../config/setup';

// Create a new player and add them to a game
export const createPlayer = async (
  player: Player,
  gameId: string,
): Promise<DatabaseReference> => {
  const playersListRef = ref(db, `games/${gameId}/players`)
  const newPlayerRef = await push(playersListRef, player);
  return newPlayerRef;
};

// Create an empty game
export const createGame = async (): Promise<DatabaseReference> => {
  const gameListRef = ref(db, 'games');
  const gameData: Game = {
    players: {},
    rounds: {},
  };
  const newGameRef = await push(gameListRef, gameData);
  return newGameRef;
};

export const findGame = async (gameId: string): Promise<Game> => {
  const snapshot = await get(
    child(ref(db), `games/${gameId}`),
  );

  if (snapshot.exists()) {
    return snapshot.val()
  } else {
    throw new Error(`Can't find game with ID ${gameId}`);
  }
};

export const createRound = async (
  round: Round,
  gameId: string,
): Promise<DatabaseReference> => {
  const roundsListRef = ref(db, `games/${gameId}/rounds`)
  const newRoundRef = await push(roundsListRef, round);
  return newRoundRef;
}

export const findRound = async (gameId: string, roundId: string): Promise<Round> => {
  const snapshot = await get(
    child(ref(db), `games/${gameId}/rounds/${roundId}`),
  );

  if (snapshot.exists()) {
    return snapshot.val()
  } else {
    throw new Error(`Can't find round with ID ${roundId}`);
  }
};

export const createBid = async (
  bid: number,
  roundId: string,
  gameId: string,
  playerId: string,
) => {
  const updates = {
    [`games/${gameId}/rounds/${roundId}/bids/${playerId}`]: bid
  }
  await update(ref(db), updates)
}

export const setRoundPoints = async (
  gameId: string,
  roundId: string,
  points: ScoreCount,
) => {
  const updates = {
    [`games/${gameId}/rounds/${roundId}/points`]: points
  }
  await update(ref(db), updates)
}

export const createTrick = async (
  trick: Trick,
  roundId: string,
  gameId: string,
): Promise<DatabaseReference> => {
  const tricksListRef = ref(db, `games/${gameId}/rounds/${roundId}/tricks`)
  const newTrickRef = await push(tricksListRef, trick)
  return newTrickRef;
}

export const createMove = async (
  moves: Move[],
  trickId: string,
  roundId: string,
  gameId: string,
) => {
  const updates = {
    [`games/${gameId}/rounds/${roundId}/tricks/${trickId}/moves`]: moves
  }
  await update(ref(db), updates)
}

export const setWinner = async (
  winner: string,
  trickId: string,
  roundId: string,
  gameId: string,
) => {
  const updates = {
    [`games/${gameId}/rounds/${roundId}/tricks/${trickId}/winner`]: winner
  }

  await update(ref(db), updates)
}
