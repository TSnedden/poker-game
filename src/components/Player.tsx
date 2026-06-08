import './css/Player.css';
import Card from './Card';
import type { Player as PlayerType } from '../types/player';

interface Props {
  player: PlayerType;
}

export default function Player({ player }: Props) {
  return (
    <div className="player">
      <h2>{player.name}</h2>

      <p>{player.chips}</p>

      <div className="player-cards">
        {player.cards.map((card, i) => (
          <Card key={i} rank={card.rank} suit={card.suit} />
        ))}
      </div>
    </div>
  );
}