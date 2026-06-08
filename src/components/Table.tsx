import './css/Table.css';

import Card from './Card';
import Player from './Player';

import type { CardData } from '../types/card';
import type { Player as PlayerType } from '../types/player';

interface TableProps {
  players: PlayerType[];
  pot: number;
  communityCards?: CardData[];
}

export default function Table({
  players,
  pot,
  communityCards = [],
}: TableProps) {
  const radius = 260;
  const centerX = 300;
  const centerY = 220;

  return (
    <div className="poker-table-wrapper">
      <div className="poker-table">
        {players.map((player, i) => {
          const angle =
            (Math.PI * (i + 1)) / (players.length + 1);

          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          return (
            <div
              key={player.name}
              className="player-seat"
              style={{
                left: x,
                top: y,
              }}
            >
              <Player player={player} />
            </div>
          );
        })}

        <div className="table-center">
          <div className="table-pot">
            Pot: ${pot}
          </div>

          <div className="community-cards">
            {communityCards.map((card, i) => (
              <Card
                key={i}
                rank={card.rank}
                suit={card.suit}
              />
            ))}
          </div>

          <div className="dealer-button">
            D
          </div>
        </div>
      </div>
    </div>
  );
}