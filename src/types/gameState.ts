import type { Player } from './player';
import type { CardData } from './card';
import type { GamePhase } from './game';

export interface GameState {
  players: Player[];
  communityCards: CardData[];
  deck: CardData[];

  pot: number;

  dealerIndex: number;
  currentTurnIndex: number;

  phase: GamePhase;
}