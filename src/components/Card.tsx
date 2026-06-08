import { useState } from 'react';
import './css/Card.css';

interface CardProps {
  rank: string;
  suit: string;
}

export default function Card({ rank, suit }: CardProps) {
  const [isFaceUp, setIsFaceUp] = useState(false);

  const cardImage = `/card_pictures/${rank}${suit}.png`;
  const cardBackImage = `/card_pictures/back.jpg`;

  return (
    <div
      className="card"
      onMouseEnter={() => setIsFaceUp(true)}
      onMouseLeave={() => setIsFaceUp(false)}
    >
      <img
        src={isFaceUp ? cardImage : cardBackImage}
        alt={isFaceUp ? `${rank} of ${suit}` : 'Card Back'}
        className="card-image"
      />
    </div>
  );
}