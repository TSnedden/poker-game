import type { CardData } from './card';

export type GamePhase =
  | 'preflop'
  | 'flop'
  | 'turn'
  | 'river'
  | 'showdown';

export interface GameState {
  pot: number;

  phase: GamePhase;

  dealerIndex: number;
  smallBlindIndex: number;
  bigBlindIndex: number;

  currentTurnIndex: number;

  communityCards: CardData[];
}

export type Street =
  | 'preflop'
  | 'flop'
  | 'turn'
  | 'river'
  | 'showdown';

export interface BlindPositions {
  dealerIndex: number;
  smallBlindIndex: number;
  bigBlindIndex: number;
}