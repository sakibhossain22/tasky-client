import { useContext, useEffect, useState } from 'react';
import useTasks from '../../useTasks/useTasks';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const AllTask = () => {
  const { data, refetch, isLoading, isError } = useTasks()
  console.log(data)
  const { user, loading } = useContext(AuthContext)
  const [todos, setTodos] = useState(data);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [ongoingTodos, setOngoingTodos] = useState([]);
useEffect(()=>{
  setTodos(data)
},[data])
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    const todoId = e.dataTransfer.getData('text/plain');
    const draggedTodo = todos.find((item) => item?.id === parseInt(todoId, 10));
    const completedDraggedTodo = completedTodos.find((item) => item?.id === parseInt(todoId, 10));
    const ongoingDraggedTodo = ongoingTodos.find((item) => item?.id === parseInt(todoId, 10));

    if (draggedTodo) {
      if (target === 'complete') {
        // Move from Todo to Complete
        setCompletedTodos((prev) => [...prev, { ...draggedTodo, status: 'complete' }]);
      } else if (target === 'ongoing') {
        // Move from Todo to Ongoing
        setOngoingTodos((prev) => [...prev, { ...draggedTodo, status: 'ongoing' }]);
      }

      setTodos((prev) => prev.filter((item) => item.id !== draggedTodo.id));
    } else if (completedDraggedTodo) {
      if (target === 'todo') {
        // Move from Complete to Todo
        setTodos((prev) => [...prev, { ...completedDraggedTodo, status: 'todo' }]);
      } else if (target === 'ongoing') {
        // Move from Complete to Ongoing
        setOngoingTodos((prev) => [...prev, { ...completedDraggedTodo, status: 'ongoing' }]);
      }

      setCompletedTodos((prev) => prev.filter((item) => item.id !== completedDraggedTodo.id));
    } else if (ongoingDraggedTodo) {
      if (target === 'todo') {
        // Move from Ongoing to Todo
        setTodos((prev) => [...prev, { ...ongoingDraggedTodo, status: 'todo' }]);
      } else if (target === 'complete') {
        // Move from Ongoing to Complete
        setCompletedTodos((prev) => [...prev, { ...ongoingDraggedTodo, status: 'complete' }]);
      }

      setOngoingTodos((prev) => prev.filter((item) => item.id !== ongoingDraggedTodo.id));
    }
  };
  if (loading) return <div className='flex items-center justify-center h-screen'><span className="loading loading-spinner loading-lg"></span></div>
  return (
    <div className='mr-3 mt-2'>
      <div className="">
        <h2 className="text-xl border-l-4 border-red-500 pl-2 uppercase  font-bold mb-2">Todo List</h2>
        <div
          className="py-4 pb-5 h-full"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, 'todo')}
        >
          <div className='grid grid-cols-12 text-white font-bold bg-yellow-500 py-2 rounded mb-2 items-center justify-between px-4'>
            <span className='col-span-5'>Title</span>
            <span className='col-span-5'>Priority</span>
            <span className='col-span-2'>Deadline</span>
          </div>
          {todos?.map((todo) => (
            <div
              key={todo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, todo.id)}
              className="cursor-pointer bg-yellow-200 p-2 mb-2"
            >
              <div className='grid grid-cols-12  items-center justify-between px-4'>
                <span className='col-span-5'>{todo.title}</span>
                <span className='col-span-5 '>{todo.priority}</span>
                <span className='col-span-2 '>{todo.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <h2 className="text-xl border-l-4 border-red-500 pl-2 uppercase  font-bold mb-4">Ongoing</h2>
        <div
          className="pb-10 h-full"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, 'ongoing')}
        >
           <div className='grid grid-cols-12 text-white font-bold bg-blue-500 py-2 rounded mb-2 items-center justify-between px-4'>
            <span className='col-span-5'>Title</span>
            <span className='col-span-5'>Priority</span>
            <span className='col-span-2'>Deadline</span>
          </div>
          {ongoingTodos?.map((todo) => (
            <div
              key={todo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, todo.id)}
              className="cursor-pointer bg-blue-200 p-2 mb-2"
            >
              <div className='grid grid-cols-12  items-center justify-between px-4'>
                <span className='col-span-5'>{todo.title}</span>
                <span className='col-span-5 '>{todo.priority}</span>
                <span className='col-span-2 '>{todo.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <h2 className="text-xl border-l-4 border-red-500 pl-2 uppercase  font-bold mb-4">Completed</h2>
        <div
          className="pb-10 h-full"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, 'complete')}
        >
           <div className='grid grid-cols-12 text-white font-bold bg-green-500 py-2 rounded mb-2 items-center justify-between px-4'>
            <span className='col-span-5'>Title</span>
            <span className='col-span-5'>Priority</span>
            <span className='col-span-2'>Deadline</span>
          </div>
          {completedTodos?.map((todo) => (
            <div
              key={todo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, todo.id)}
              className="cursor-pointer bg-green-200 p-2 mb-2"
            >
              <div className='grid grid-cols-12  items-center justify-between px-4'>
                <span className='col-span-5'>{todo.title}</span>
                <span className='col-span-5 '>{todo.priority}</span>
                <span className='col-span-2 '>{todo.deadline}</span>
              </div>

            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default AllTask;
