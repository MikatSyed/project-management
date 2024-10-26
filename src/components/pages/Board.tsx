"use client"
import React from 'react';
import TaskList from './TaskList';
 // Assuming TaskList component is exported from TaskList.js

const Board = () => {
  return (
    <div className="board">
      <TaskList status="To Do" />
      <TaskList status="In Progress" />
      <TaskList status="Done" />
    </div>
  );
};

export default Board;
