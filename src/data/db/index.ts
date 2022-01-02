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
    startPlayer: string;
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
  startPlayer: string;
}

export const readRoundUpdates = (gameId: string, callback: (data: Round[]) => void) => {
  const roundsRef = ref(db, `games/${gameId}/rounds`)
  onValue(roundsRef, (snapshot) => {
    const data = snapshot.val() || {};
    const rounds = Object.keys(data).map((key) => ({
      key,
      ...data[key],
    }))
    callback(rounds)
  })
}
