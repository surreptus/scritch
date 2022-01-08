export const SUITS = ['club', 'diamond', 'heart', 'spade'] as const
export const VALUES = [
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'jack',
  'queen',
  'king',
  'ace'
] as const

export type Suit = typeof SUITS[number]

export type Value = typeof VALUES[number]

export enum Trump {
  'clubs',
  'diamonds',
  'hearts',
  'spades',
  'none',
}

export type Card = {
  suit: typeof SUITS[number]
  value: typeof VALUES[number]
}

export type Player = {
  id: string,
  name: string,
}

export type Round = {
  id: string;
  hands?: {
    [key:string]: number[];
  };
  bids?: {
    [key:string]: number;
  };
  numCards: number;
  trump: number;
  playerOrder: string[];
  tricks?: Trick[];
  points?: {
    [key: string]: number;
  };
}
export type Move = {
  playerId: string;
  card: number;
}
export type Trick = {
  playerOrder?: string[];
  moves?: Move[];
  winner: string,
  id: string,
}

export type Action = 'bid' | 'play' | 'deal'
export interface CurrentRoundInfo {
  idx: number;
  waitingOnPlayer: string;
  nextAction: Action;
}

export interface CurrentRound extends Round{
  idx: number;
  waitingOnPlayer: string;
  nextAction: Action;
}

