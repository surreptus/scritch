export type Trump = 0 | 1 | 2 | 3 | 4;
export type Suit = 0 | 1 | 2 | 3;

export type Card = {
  suit: string;
  value: string;
}

export interface Player {
  name: string;
  points: number;
}

export interface Players {
  [key:string]: Player;
}

export interface Game {
  players: Players;
  rounds: Rounds;
}

export interface Rounds {
  [key:string]: Round
}

export interface Round {
  key?: string;
  hands: Hands;
  bids: Bids;
  tricks: Tricks;
  numCards: number;
  trump: Trump;
  playerOrder: string[];
}

export interface Hands {
  [key:string]: number[];
}

export interface Bids {
  [key:string]: number;
}

export interface Tricks {
  [key:string]: Trick;
}
export interface Trick {
  moves: Move[];
  playerOrder: string[];
  winner?: string;
}

export interface Move {
  playerId: string;
  card: number;
}
