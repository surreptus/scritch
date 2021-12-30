import {
  connectDatabaseEmulator,
  ref,
  push,
  set,
  get,
  child,
  DatabaseReference,
} from '@firebase/database';

import {
  Player,
  Game
} from '../types'

import { db } from '../config/setup';

// Point to the RTDB emulator running on localhost.
connectDatabaseEmulator(db, 'localhost', 9000);

// Create a new player and add them to a game
export const createPlayer = async (
  playerName: string,
  gameId: string,
): Promise<DatabaseReference> => {
  console.log("player", playerName, "game", gameId)
  const playerListRef = ref(db, 'players');
  const newPlayerRef = push(playerListRef);

  const playerData: Player = {
    name: playerName,
    gameId: gameId,
  };

  await set(newPlayerRef, playerData);
  await push(ref(db, `games/${gameId}/players`), newPlayerRef.key);
  return newPlayerRef;
};

// Create an empty game
export const createGame = async (): Promise<DatabaseReference> => {
  const gameListRef = ref(db, 'games');

  const gameData: Game = {
    players: [],
    rounds: [],
  };

  const newGameRef = push(gameListRef);

  await set(newGameRef, gameData);

  return newGameRef;
};

export const findGame = async (gameId: string): Promise<Game> => {
  const dbRef = ref(db);
  const snapshot = await get(
    child(dbRef, `http://localhost:9000/games/${gameId}`),
  );

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    throw new Error(`Can't find game with ID ${gameId}`);
  }
};
