import type { CardData } from '../types/card';

const suits = ['H', 'S', 'D', 'C'];
const ranks = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
];

export function shuffleDeck(): CardData[] {
  const deck = suits.flatMap((suit) =>
    ranks.map((rank) => ({
      rank,
      suit,
    }))
  );

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}