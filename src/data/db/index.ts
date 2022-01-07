import {
  ref,
  onValue,
} from '@firebase/database';

import { db } from "../../config/setup";

export type PlayersData = {
  [key:string]: {
    name: string;
    points: number;
  }
}

export type Player = {
  key: string;
  name: string;
  points: number;
}

export const readPlayerUpdates = (gameId: string, callback: (data: Player[]) => void) => {
  const playersRef = ref(db, `games/${gameId}/players`)
  onValue(playersRef, (snapshot) => {
    const data = snapshot.val()
    const players = Object.keys(data).map((key) => ({
      key,
      ...data[key]
    }));

    callback(players)
  })
}

export type RoundsData = {
  [key: string]: {
    hands: {
      [key:string]: number[];
    };
    bids: {
      [key:string]: number;
    };
    numCards: number;
    trump: string;
    playerOrder: string[];
    tricks: {
      [key:string]: Trick;
    }
  }
}
export type Round = {
  key: string;
  hands: {
    [key:string]: number[];
  };
  bids: {
    [key:string]: number;
  };
  numCards: number;
  trump: string;
  playerOrder: string[];
  tricks: Trick[];
  points: {
    [key: string]: number;
  };
}
export type Move = {
  playerId: string;
  card: number;
}
export type Trick = {
  playerOrder: string[];
  moves: Move[];
  winner: string,
  key: string,
}

export const readRoundUpdates = (gameId: string, callback: (data: Round[]) => void) => {
  const roundsRef = ref(db, `games/${gameId}/rounds`)
  onValue(roundsRef, (snapshot) => {
    const data = snapshot.val() || {};

    const rounds = Object.keys(data).map((rId) => {
      const round = data[rId]
      const tricks = Object.keys(round.tricks || {}).map((tId) => ({
        key: tId,
        ...round.tricks[tId]
      }))

      return {
        key: rId,
        ...round,
        tricks,
      }
    })
    callback(rounds)
  })
}
