// AllInOneComponent.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDrop } from 'react-dnd';

const Dashboard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    ongoing: [],
    completed: [],
  });

  const { register, handleSubmit, reset } = useForm();

  const handleCreateTask = (newTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, newTask],
    }));
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: prevTasks.todo.filter((task) => task.id !== taskId),
      ongoing: prevTasks.ongoing.filter((task) => task.id !== taskId),
      completed: prevTasks.completed.filter((task) => task.id !== taskId),
    }));
  };

  const handleDropTask = (taskId, targetList) => {
    setTasks((prevTasks) => {
      const updatedTasks = {
        todo: prevTasks.todo.filter((task) => task.id !== taskId),
        ongoing: prevTasks.ongoing.filter((task) => task.id !== taskId),
        completed: prevTasks.completed.filter((task) => task.id !== taskId),
      };

      updatedTasks[targetList] = [...prevTasks[targetList], prevTasks.todo.find((task) => task.id === taskId)];
      return updatedTasks;
    });
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => handleDropTask(item.id, 'ongoing'),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const userTypes = [
    {
      title: 'Developers',
      description: 'Manage and organize tasks in a collaborative environment. Track deadlines and priorities.',
    },
    {
      title: 'Corporate Professionals',
      description: 'Efficiently handle project tasks, deadlines, and priorities. Stay organized in the workplace.',
    },
    {
      title: 'Bankers',
      description: 'Keep track of important tasks and deadlines. Prioritize and manage work effectively.',
    },
    // Add more user types as needed
  ];

  return (
    <div>
      <h1>Task Management Dashboard</h1>
      
      <h2>Who Can Benefit?</h2>
      <ul>
        {userTypes.map((userType, index) => (
          <li key={index}>
            <strong>{userType.title}</strong>: {userType.description}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit((data) => handleCreateTask({ id: Date.now(), ...data }))}>
        <label>
          Title:
          <input {...register('title', { required: true })} />
        </label>
        <label>
          Description:
          <input {...register('description')} />
        </label>
        <label>
          Deadline:
          <input type="date" {...register('deadline')} />
        </label>
        <label>
          Priority:
          <select {...register('priority')}>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </label>
        <button type="submit">Add Task</button>
      </form>

      <div ref={drop} style={{ border: isOver ? '2px dashed #000' : '2px solid #000', margin: '10px', padding: '10px' }}>
        <h2>To-Do</h2>
        {tasks.todo.map((task) => (
          <div key={task.id} style={{ border: '1px solid #000', margin: '5px', padding: '5px' }}>
            <h3>{task.title}</h3>
            <p>Description: {task.description}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Priority: {task.priority}</p>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>

      <div style={{ border: '2px solid #000', margin: '10px', padding: '10px' }}>
        <h2>Ongoing</h2>
        {tasks.ongoing.map((task) => (
          <div key={task.id} style={{ border: '1px solid #000', margin: '5px', padding: '5px' }}>
            <h3>{task.title}</h3>
            <p>Description: {task.description}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Priority: {task.priority}</p>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>

      <div style={{ border: '2px solid #000', margin: '10px', padding: '10px' }}>
        <h2>Completed</h2>
        {tasks.completed.map((task) => (
          <div key={task.id} style={{ border: '1px solid #000', margin: '5px', padding: '5px' }}>
            <h3>{task.title}</h3>
            <p>Description: {task.description}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Priority: {task.priority}</p>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
