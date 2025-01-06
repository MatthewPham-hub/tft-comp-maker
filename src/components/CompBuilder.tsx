"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ChampionCard from "./ChampionCard";

type Champion = {
  id: string;
  name: string;
  cost: number;
  traits: string[];
};

type CompBuilderProps = {
  champions: Champion[];
};

const CompBuilder: React.FC<CompBuilderProps> = ({ champions }) => {
  const [championPool, setChampionPool] = useState<Champion[]>(champions);
  const [comp, setComp] = useState<Champion[]>([]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // If no destination, exit
    if (!destination) return;

    // If dragging within the same list
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "comp") {
        const updatedComp = Array.from(comp);
        const [movedChampion] = updatedComp.splice(source.index, 1);
        updatedComp.splice(destination.index, 0, movedChampion);
        setComp(updatedComp);
      }
    } else {
      // If dragging between different lists
      if (source.droppableId === "pool" && destination.droppableId === "comp") {
        // Remove from champion pool
        const updatedPool = Array.from(championPool);
        const [movedChampion] = updatedPool.splice(source.index, 1);

        // Add to comp
        const updatedComp = Array.from(comp);
        updatedComp.splice(destination.index, 0, movedChampion);

        setChampionPool(updatedPool);
        setComp(updatedComp);
      }
    }
  };

  const saveComp = () => {
    if (comp.length === 0) {
      alert("Cannot save an empty comp!");
      return;
    }

    const savedComps = JSON.parse(localStorage.getItem("tftComps") || "[]");
    const newComp = {
      id: `comp-${Date.now()}`,
      name: `Comp ${savedComps.length + 1}`,
      champions: comp,
    };

    savedComps.push(newComp);
    localStorage.setItem("tftComps", JSON.stringify(savedComps));
    alert("Comp saved successfully!");
  };

  return (
    <div className="bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Comp Builder</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-2 gap-8">
          {/* Champion Pool */}
          <Droppable droppableId="pool" isCombineEnabled={false} ignoreContainerClipping={false} isDropDisabled={false}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-4 border rounded bg-gray-800"
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
                className="p-4 border rounded bg-gray-800"
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
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <button
        onClick={saveComp}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Comp
      </button>
    </div>
  );
};

export default CompBuilder;
