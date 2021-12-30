export type Suit = 'club' | 'heart' | 'diamond' | 'spade';
export type Trump = Suit | 'none';

export interface Player {
  key?: string;
  name: string;
  gameId: string;
}

export interface Game {
  key?: string;
  players: Player[];
  rounds: Round[];
}

export interface Round {
  key?: string;
  index: number;
  gameId: string;
  hands: Hand[];
  bids: Bid[];
  tricks: Trick[];
  numCards: number;
}

export interface Hand {
  playerId: string;
  cards: number[];
}

export interface Bid {
  key?: string;
  playerId: string;
  bid: number;
}

export interface Trick {
  trump: Trump;
  moves: Move[];
  startPlayer: string;
}

export interface Move {
  playerId: string;
  card: number;
}
