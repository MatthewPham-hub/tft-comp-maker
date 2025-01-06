"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NavBar } from '@/components/NavBar'

type Champion = {
  id: string;
  name: string;
  cost: number;
  traits: string[];
  ability: {
    name: string;
    description: string;
  };
};

type Comp = {
  id: string;
  name: string;
  champions: Champion[];
};

const CompDetailsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const compId = searchParams.get("compId");
  const [compData, setCompData] = useState<Comp | null>(null);

  useEffect(() => {
    if (!compId) return;
    const savedComps = JSON.parse(localStorage.getItem("tftComps") || "[]");
    const comp = savedComps.find((c: Comp) => c.id === compId);
    setCompData(comp || null);
  }, [compId]);

  if (!compData) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p>Loading comp details...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <NavBar />
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-5">{compData.name}</h1>
        <div>
          <h2 className="text-xl font-semibold mb-3">Champions:</h2>
          {compData.champions.map((champion) => (
            <div key={champion.id} className="border p-4 rounded bg-gray-800 mb-4">
              <h3 className="text-lg font-bold">{champion.name}</h3>
              <p>Cost: {champion.cost}</p>
              <p>Traits: {champion.traits.join(", ")}</p>
              <p>
                <strong>Ability:</strong> {champion.ability.name}
              </p>
              <p>{champion.ability.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompDetailsPage;