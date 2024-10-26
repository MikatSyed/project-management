"use client";
import React, { useState, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { useTaskStore } from "@/stores/taskStore";

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

interface Card {
  id: string;
  text: string;
}

interface Column {
  id: string;
  title: string;
  cards: Card[];
}

const TaskManagement = ({ tasks, onTaskAdded }: any) => {
  const { updateTaskStatus, deleteTask } = useTaskStore();
  const [columns, setColumns] = useState<Column[]>([]);
  const [draggedCard, setDraggedCard] = useState<Card | null>(null);

  useEffect(() => {
    // Initialize columns from tasks on mount or when tasks change
    const initializeColumns = () => {
      const initialColumns: Column[] = [
        {
          id: "To Do",
          title: "To Do",
          cards: tasks
            .filter((task: Task) => task.status === "To Do")
            .map((task: Task) => ({ id: `card${task.id}`, text: task.title })),
        },
        {
          id: "In Progress",
          title: "In Progress",
          cards: tasks
            .filter((task: Task) => task.status === "In Progress")
            .map((task: Task) => ({ id: `card${task.id}`, text: task.title })),
        },
        {
          id: "Done",
          title: "Done",
          cards: tasks
            .filter((task: Task) => task.status === "Done")
            .map((task: Task) => ({ id: `card${task.id}`, text: task.title })),
        },
      ];
      setColumns(initialColumns);
    };
    
    initializeColumns();
  }, [tasks]);

  const handleDeleteCard = (cardId: string) => {
    const taskId = parseInt(cardId.replace("card", ""));
    deleteTask(taskId);
    onTaskAdded()
    setColumns(columns.map(column => ({
      ...column,
      cards: column.cards.filter(card => card.id !== cardId),
    })));
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, card: Card) => {
    setDraggedCard(card);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
    event.preventDefault();
    if (draggedCard) {
      const taskId = parseInt(draggedCard.id.replace("card", ""));
      
      // Update the task status in the store
      updateTaskStatus(taskId, targetColumnId as 'To Do' | 'In Progress' | 'Done');
      onTaskAdded()

      // Create a new state for updated columns
      const updatedColumns = columns.map((column) => {
        // If the column is the one the card was dragged from, remove the card
        if (column.cards.some(card => card.id === draggedCard.id)) {
          return {
            ...column,
            cards: column.cards.filter((card) => card.id !== draggedCard.id),
          };
        } 
        // If the column is the target column, add the card
        else if (column.id === targetColumnId) {
          return {
            ...column,
            cards: [...column.cards, draggedCard],
          };
        }
        return column; // return other columns as they are
      });

      // Update the state with the new columns
      setColumns(updatedColumns);
      setDraggedCard(null); // Reset dragged card state
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Drag and Drop</h2>
      <div className="flex justify-start">
        <div className="flex flex-row space-x-4 ">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex flex-col bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 rounded-md w-[18rem]"
              onDrop={(e) => handleDrop(e, column.id)}
              onDragOver={handleDragOver}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">{column.title}</h2>
                <HiDotsHorizontal className="text-gray-500 cursor-pointer" />
              </div>
              <div className="flex flex-col gap-2">
                {column.cards.map((card) => (
                  <div
                    key={card.id}
                    className={`flex justify-between items-center bg-white rounded-md p-2 shadow-md cursor-move ${
                      draggedCard?.id === card.id ? "opacity-40" : ""
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, card)}
                  >
                    <div className="w-full text-left py-2 px-4 font-semibold text-gray-700">
                      {card.text}
                    </div>
                    <CgClose
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDeleteCard(card.id)}
                    />
                  </div>
                ))}
                {column.cards.length === 0 && (
                  <div className="h-16 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                    Drop here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskManagement;
