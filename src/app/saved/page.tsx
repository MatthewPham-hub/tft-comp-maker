"use client";
// Saved Comps Page
import React, { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar"

type SavedComp = {
  id: string;
  name: string;
};

const SavedCompsPage: React.FC = () => {
  const [savedComps, setSavedComps] = useState<SavedComp[]>([]);

  useEffect(() => {
    const comps = JSON.parse(localStorage.getItem("tftComps") || "[]");
    setSavedComps(comps);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <NavBar />
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-5">Saved Comps</h1>
        {savedComps.length === 0 ? (
          <p>No saved comps found!</p>
        ) : (
          <ul>
            {savedComps.map((comp) => (
              <li key={comp.id} className="mb-4">
                <div className="border p-4 rounded bg-gray-800">
                  <h3 className="text-xl font-bold">{comp.name}</h3>
                  <a href={`/${comp.id}`} className="text-blue-500 hover:underline">
                    View Details
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SavedCompsPage;
