import {
  getDatabase,
  connectDatabaseEmulator,
  ref,
  push,
  set,
  DatabaseReference
} from "@firebase/database";

const db = getDatabase();
// Point to the RTDB emulator running on localhost.
connectDatabaseEmulator(db, "localhost", 9000);

interface Player {
  name: string;
  game: string;
}

interface Game {
  players: string[];
  rounds: string[];
}

// Create a new player and add them to a game
export const createPlayer = async (playerName: string, gameId: string): Promise<DatabaseReference> => {
  const db = getDatabase();
  const playerListRef = ref(db, 'players');
  const newPlayerRef = push(playerListRef);

  const playerData: Player = {
    name: playerName,
    game: gameId,
  }

  await set(newPlayerRef, playerData)
  await push(ref(db, `games/${gameId}/players`), newPlayerRef.key)
  return newPlayerRef
}

// Create an empty game
export const createGame = async (): Promise<DatabaseReference> => {
  const db = getDatabase();
  const gameListRef = ref(db, 'games');

  const gameData: Game = {
    players: [],
    rounds: [],
  }
  const newGameRef = push(gameListRef);

  await set(newGameRef, gameData)

  return newGameRef
}
