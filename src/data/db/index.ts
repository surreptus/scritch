import {
  ref,
  onValue,
} from '@firebase/database';

import { db } from "../../config/setup";
import {Player, Round, Move, Trick} from 'types'

export type PlayersData = {
  [key:string]: {
    name: string;
    points: number;
  }
}

export const readPlayerUpdates = (gameId: string, callback: (data: Player[]) => void) => {
  const playersRef = ref(db, `games/${gameId}/players`)
  onValue(playersRef, (snapshot) => {
    const data = snapshot.val() || {}
    const players = Object.keys(data).map((id) => ({
      id,
      ...data[id]
    }));

    callback(players)
  })
}

export type RoundsData = {
  [key: string]: {
    hands?: {
      [key:string]: number[];
    };
    bids?: {
      [key:string]: number;
    };
    numCards?: number;
    trump: string;
    playerOrder: string[];
    tricks?: {
      [key:string]: Trick;
    }
  }
}

export const readRoundUpdates = (gameId: string, callback: (data: Round[]) => void) => {
  const roundsRef = ref(db, `games/${gameId}/rounds`)
  onValue(roundsRef, (snapshot) => {
    const data = snapshot.val() || {};
    console.log("data", data)

    const rounds = Object.keys(data).map((rId) => {
      const round = data[rId]
      const tricks = Object.keys(round.tricks || {}).map((tId) => ({
        id: tId,
        ...round.tricks[tId]
      }))

      return {
        id: rId,
        ...round,
        tricks,
      }
    })
    callback(rounds)
  })
}
