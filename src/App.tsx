import { useState } from 'react';

import './App.css';

import Table from './components/Table';

import { shuffleDeck } from './game/deck';

import type { CardData } from './types/card';
import type { Player } from './types/player';
import type { GamePhase } from './types/game';

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [pot] = useState(0);

  const [communityCards, setCommunityCards] = useState<CardData[]>([]);
  const [phase, setPhase] = useState<GamePhase>('preflop');
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [deck, setDeck] = useState<CardData[]>([]);
  const [dealerIndex, setDealerIndex] = useState(0);
  const smallBlindIndex =
    players.length > 0
      ? (dealerIndex + 1) % players.length
      : -1;

  const bigBlindIndex =
    players.length > 0
      ? (dealerIndex + 2) % players.length
      : -1;

  const underTheGunIndex =
    players.length > 0
      ? (dealerIndex + 3) % players.length
      : -1;

  function startGame(handDealerIndex: number = dealerIndex) {
    const freshDeck = shuffleDeck();
    const workingDeck = [...freshDeck];

    const newPlayers: Player[] = [];

    for (let i = 1; i <= 6; i++) {
      newPlayers.push({
        name: `Player ${i}`,
        chips: 1000,

        cards: [
          workingDeck.pop()!,
          workingDeck.pop()!,
        ],

        folded: false,
        allIn: false,
        currentBet: 0,
      });
    }
    setDeck(workingDeck);
    setPlayers(newPlayers);
    setCommunityCards([]);
    setPhase('preflop');
    if (newPlayers.length > 0) {
      setCurrentTurnIndex(
        (handDealerIndex + 3) % newPlayers.length
      );
    }
  }

  function startFirstGame() {
    startGame(0);
  }

  function startNewHand() {
    const nextDealerIndex =
      players.length === 0
        ? 0
        : (dealerIndex + 1) % players.length;

    setDealerIndex(nextDealerIndex);

    startGame(nextDealerIndex);
  }

  function dealFlop() {
    if (players.length === 0) {
      return;
    }
    if (phase !== 'preflop') {
      return;
    }

    const workingDeck = [...deck];

    const flop = [
      workingDeck.pop()!,
      workingDeck.pop()!,
      workingDeck.pop()!,
    ];

    setCommunityCards(flop);

    setDeck(workingDeck);

    setPhase('flop');
  }

  function dealTurn() {
    if (players.length === 0) {
      return;
    }
    if (phase !== 'flop') {
      return;
    }

    const workingDeck = [...deck];

    const turnCard = workingDeck.pop()!;

    setCommunityCards(prev => [
      ...prev,
      turnCard,
    ]);

    setDeck(workingDeck);

    setPhase('turn');
  }

  function dealRiver() {
    if (players.length === 0) {
      return;
    }
    if (phase !== 'turn') {
      return;
    }

    const workingDeck = [...deck];

    const riverCard = workingDeck.pop()!;

    setCommunityCards(prev => [
      ...prev,
      riverCard,
    ]);

    setDeck(workingDeck);

    setPhase('river');
  }

  function goToShowdown() {
    if (players.length === 0) {
      return;
    }
    if (phase !== 'river') {
      return;
    }

    setPhase('showdown');
  }

  return (
    <div className="App">
      {players.length === 0 ? (
        <button onClick={startFirstGame}>
          Start Game
        </button>
      ) : (
        <button onClick={startNewHand}>
          New Hand
        </button>
      )}
      {players.length > 0 && (
        <>
          <h2>Phase: {phase}</h2>
          <h2>
            Current Turn:
            {players[currentTurnIndex]?.name ??
              'None'}
          </h2>
          <button
            onClick={() =>
              setCurrentTurnIndex(
                (prev) =>
                  players.length === 0
                    ? 0
                    : (prev + 1) % players.length
              )
            }
          >
            Next Turn
          </button>
          <h2>
            Dealer:
            {players[dealerIndex]?.name ?? 'None'}
          </h2>
          <h2>
            Small Blind:
            {players[smallBlindIndex]?.name ?? 'None'}
          </h2>
          <h2>
            Big Blind:
            {players[bigBlindIndex]?.name ?? 'None'}
          </h2>
          <h2>
            UTG:
            {players[underTheGunIndex]?.name ?? 'None'}
          </h2>

          <button onClick={dealFlop}>
            Deal Flop
          </button>

          <button onClick={dealTurn}>
            Deal Turn
          </button>

          <button onClick={dealRiver}>
            Deal River
          </button>

          <button onClick={goToShowdown}>
            Showdown
          </button>

          <h3>Cards Remaining: {deck.length}</h3>
        </>
      )}

      <Table
        players={players}
        pot={pot}
        communityCards={communityCards}
      />
      
    </div>
    
  );
}

export default App;