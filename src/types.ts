export type Suit = 'spades' | 'hearts' | 'clubs' | 'diamonds'
export type Trump = 'none' | Suit

export interface Card {
  suit: Suit;
  value: number;
}
