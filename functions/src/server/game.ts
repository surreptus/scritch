import * as db from '../db/repository';

interface CreateGameResp {
  gameId: string;
  player: string;
}

interface JoinGameResp {
  player: string;
}

interface StartGameResp {
  gameId: string;
  //players: string
}

export const createGame = async (
  playerName: string,
): Promise<CreateGameResp> => {
  const game = await db.createGame();
  const player = await db.createPlayer(playerName, game.key || '');
  if (!game.key || !player.key) {
    throw new Error(`Missing ID: playerId: ${player.key}, gameID: ${game.key}`);
  }

  return {gameId: game.key, player: player.key};
};

export const joinGame = async (
  playerName: string,
  gameId: string,
): Promise<JoinGameResp> => {
  const player = await db.createPlayer(playerName, gameId);

  if (!player.key) {
    throw new Error(`Missing ID: playerId: ${player.key}`);
  }

  return {player: player.key};
};

export const startGame = async (gameId: string): Promise<StartGameResp> => {
  const game = await db.findGame(gameId);

  if (!game.key) {
    throw new Error(`Missing ID: gameID: ${game.key}`);
  }

  return {
    gameId: game.key
  }
};
