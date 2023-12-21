import React, { useState } from 'react';

const AllTask = () => {
  const [todos, setTodos] = useState([
    { id: 1, name: 'mango', status: 'todo' },
    { id: 2, name: 'apple', status: 'todo' },
    { id: 3, name: 'orange', status: 'todo' },
    { id: 4, name: 'cucumber', status: 'todo' },
  ]);

  const [completedTodos, setCompletedTodos] = useState([]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    const todoId = e.dataTransfer.getData('text/plain');
    const draggedTodo = todos.find((item) => item.id === parseInt(todoId, 10));
    const completedDraggedTodo = completedTodos.find((item) => item.id === parseInt(todoId, 10));

    if (draggedTodo) {
      // Moving from Todo to Complete
      setCompletedTodos((prev) => [...prev, { ...draggedTodo, status: 'complete' }]);
      setTodos((prev) => prev.filter((item) => item.id !== draggedTodo.id));
    } else if (completedDraggedTodo) {
      // Moving from Complete to Todo
      setTodos((prev) => [...prev, { ...completedDraggedTodo, status: 'todo' }]);
      setCompletedTodos((prev) => prev.filter((item) => item.id !== completedDraggedTodo.id));
    }
  };

  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <h2 className="text-lg font-bold mb-4">Todo List</h2>
        <div
          className="border border-dashed p-4 h-full"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, 'todo')}
        >
          {todos.map((todo) => (
            <div
              key={todo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, todo.id)}
              className="cursor-pointer bg-gray-200 p-2 mb-2"
            >
              {todo.name}
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/2 p-4">
        <h2 className="text-lg font-bold mb-4">Completed</h2>
        <div
          className="border border-dashed p-4 h-full"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, 'complete')}
        >
          {completedTodos.map((todo) => (
            <div
              key={todo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, todo.id)}
              className="cursor-pointer bg-green-200 p-2 mb-2"
            >
              {todo.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTask;
