"use client";

import React, { useState, useMemo } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import ChampionCard from "./ChampionCard";

type Champion = {
  id: string;
  name: string;
  cost: number;
  traits: string[];
  ability: { name: string; description: string };
  icon: string;
};

type Trait = {
  name: string;
  description: string;
  breakpoints: { count: number; effect: string }[];
  icon: string;
};

type CompBuilderProps = {
  champions: Champion[];
  traits: Trait[];
};

const CompBuilder: React.FC<CompBuilderProps> = ({ champions, traits }) => {
  const [championPool, setChampionPool] = useState<Champion[]>(champions);
  const [comp, setComp] = useState<Champion[]>([]);

  const MAX_COMP_SIZE = 12;

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If no destination, handle removal from comp
    if (!destination) {
      if (source.droppableId === "comp") {
        const updatedComp = Array.from(comp);
        const [removedChampion] = updatedComp.splice(source.index, 1);

        // Add removed champion back to the pool
        setChampionPool((prevPool) => [...prevPool, removedChampion]);
        setComp(updatedComp);
      }
      return;
    }

    // If dragging within the same list
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "comp") {
        const updatedComp = Array.from(comp);
        const [movedChampion] = updatedComp.splice(source.index, 1);
        updatedComp.splice(destination.index, 0, movedChampion);
        setComp(updatedComp);
      }
      if (source.droppableId === "pool") {
        const updatedPool = Array.from(championPool);
        const [movedChampion] = updatedPool.splice(source.index, 1);
        updatedPool.splice(destination.index, 0, movedChampion);
        setChampionPool(updatedPool);
      }
    } else {
      // If dragging from pool to comp
      if (source.droppableId === "pool" && destination.droppableId === "comp") {
        if (comp.length >= MAX_COMP_SIZE) {
          console.warn("You can only add up to 12 champions.");
          return;
        }

        const updatedPool = Array.from(championPool);
        const [movedChampion] = updatedPool.splice(source.index, 1);

        const updatedComp = Array.from(comp);
        updatedComp.splice(destination.index, 0, movedChampion);

        setChampionPool(updatedPool);
        setComp(updatedComp);
      }

      // If dragging from comp to pool
      if (source.droppableId === "comp" && destination.droppableId === "pool") {
        const updatedComp = Array.from(comp);
        const [movedChampion] = updatedComp.splice(source.index, 1);

        const updatedPool = Array.from(championPool);
        updatedPool.splice(destination.index, 0, movedChampion);

        setComp(updatedComp);
        setChampionPool(updatedPool);
      }
    }
  };

  // Calculate activated traits and their counts
  const activatedTraits = useMemo(() => {
    const traitsCount: { [key: string]: number } = {};
    comp.forEach((champion) => {
      champion.traits.forEach((trait) => {
        traitsCount[trait] = (traitsCount[trait] || 0) + 1;
      });
    });
    return traitsCount;
  }, [comp]);

  const traitBreakpoints = useMemo(() => {
    return traits
      .filter((trait) => activatedTraits[trait.name] !== undefined) // Ensure the trait exists in activatedTraits
      .map((trait) => {
        const count = activatedTraits[trait.name] || 0; // Default to 0 if undefined
        const activeBreakpoint = trait.breakpoints.find((bp) => bp.count <= count);

        // Handle special case for Emissary
        if (trait.name === "Emissary" && (count === 2 || count === 3)) {
          return {
            ...trait,
            activeBreakpoint: null, // Mark as inactive
            isAlwaysVisible: true,
          };
        }

        return {
          ...trait,
          activeBreakpoint,
        };
      });
  }, [traits, activatedTraits]);

  return (
    <div className="bg-gray-900 text-white p-4 grid grid-cols-3 gap-4">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Champion Pool */}
        <Droppable droppableId="pool" isCombineEnabled={false} ignoreContainerClipping={false} isDropDisabled={false}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="p-4 border rounded bg-gray-800 col-span-1"
            >
              <h3 className="text-xl font-bold mb-4">Champion Pool</h3>
              {championPool.map((champion, index) => (
                <Draggable key={champion.id} draggableId={champion.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4"
                    >
                      <ChampionCard
                        name={champion.name}
                        cost={champion.cost}
                        traits={champion.traits}
                        icon={champion.icon}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Comp Area */}
        <Droppable droppableId="comp" isCombineEnabled={false} ignoreContainerClipping={false} isDropDisabled={false}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="p-4 border rounded bg-gray-800 col-span-1"
            >
              <h3 className="text-xl font-bold mb-4">Your Comp</h3>
              {comp.map((champion, index) => (
                <Draggable key={champion.id} draggableId={champion.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4"
                    >
                      <ChampionCard
                        name={champion.name}
                        cost={champion.cost}
                        traits={champion.traits}
                        icon={champion.icon}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {comp.length >= MAX_COMP_SIZE && (
                <p className="text-red-500 mt-4">You can only add up to 12 champions.</p>
              )}
            </div>
          )}
        </Droppable>

        {/* Activated Traits */}
        <div className="p-4 border rounded bg-gray-800 col-span-1">
          <h3 className="text-xl font-bold mb-4">Activated Traits</h3>
          <ul>
            {traitBreakpoints.map((trait) => (
              <li key={trait.name} className="mb-4 flex items-center">
                <img
                  src={`/icons/${trait.icon}`}
                  alt={trait.name}
                  className="w-6 h-6 mr-2"
                />
                <div>
                  <strong>{trait.name}:</strong> {activatedTraits[trait.name] || 0}
                  <div className="mt-2 text-sm text-gray-400">
                    {trait.description}
                  </div>
                  {trait.activeBreakpoint ? (
                    <div className="mt-2 text-sm text-gray-400">
                      Current Bonus: {trait.activeBreakpoint.effect}
                    </div>
                  ) : (
                    <div className="mt-2 text-sm text-red-500">Inactive</div>
                  )}
                  <div className="mt-2 text-sm text-gray-500">
                    Breakpoints:
                    <ul>
                      {trait.breakpoints.map((bp, index) => (
                        <li key={index}>
                          {bp.count} units: {bp.effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </DragDropContext>
    </div>
  );
};

export default CompBuilder;
