export type Suit = 'spade' | 'heart' | 'club' | 'diamond'

export interface Card {
  suit: Suit;
  value: number;
}
