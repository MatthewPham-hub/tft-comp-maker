// components/ChampionCard.tsx
import React from 'react';

type ChampionCardProps = {
  name: string;
  cost: number;
  traits: string[];
};

const ChampionCard: React.FC<ChampionCardProps> = ({ name, cost, traits }) => {
  return (
    <div className="border p-4 rounded bg-gray-800 text-white">
      <h3 className="text-lg font-bold">{name}</h3>
      <p>Cost: {cost}</p>
      <p>Traits: {traits.join(', ')}</p>
    </div>
  );
};

export default ChampionCard;