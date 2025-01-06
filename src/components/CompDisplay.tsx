// components/CompDisplay.tsx
import React from 'react';

type CompDisplayProps = {
  synergies: { [key: string]: number };
};

const CompDisplay: React.FC<CompDisplayProps> = ({ synergies }) => {
  return (
    <div className="border p-4 rounded bg-gray-800 text-white">
      <h2 className="text-xl font-bold mb-4">Current Synergies</h2>
      <ul>
        {Object.entries(synergies).map(([trait, count]) => (
          <li key={trait}>
            {trait}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompDisplay;