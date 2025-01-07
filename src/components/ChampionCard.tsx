type ChampionCardProps = {
  name: string;
  cost: number;
  traits: string[];
  icon: string; // Add the icon prop
};

const ChampionCard: React.FC<ChampionCardProps> = ({ name, cost, traits, icon }) => {
  return (
    <div className="flex items-center p-2 border rounded bg-gray-700">
      <img src={`/icons/${icon}`} alt={name} className="w-10 h-10 mr-2" />
      <div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm">Cost: {cost}</p>
        <p className="text-xs text-gray-300">Traits: {traits.join(", ")}</p>
      </div>
    </div>
  );
};

export default ChampionCard;
