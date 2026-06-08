import type { CardData } from './card';

export interface Player {
  name: string;
  chips: number;
  cards: CardData[];

  folded: boolean;
  allIn: boolean;
  currentBet: number;
}