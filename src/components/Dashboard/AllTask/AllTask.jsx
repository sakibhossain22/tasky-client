import { useContext, useEffect, useState } from 'react';
import useTasks from '../../useTasks/useTasks';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../AxiosSecure/useAxiosSecure';

const AllTask = () => {
  const { data, refetch, isLoading, isError } = useTasks()

  const { user, loading } = useContext(AuthContext)
  const [todos, setTodos] = useState();
  const [completedTodos, setCompletedTodos] = useState([]);
  const [ongoingTodos, setOngoingTodos] = useState([]);
  const axiosSecure = useAxiosSecure()
  // onGOing Update
  useEffect(() => {
    const postData = async () => {
      console.log(ongoingTodos);
      const item = ongoingTodos[ongoingTodos.length - 1];

      // Make sure there is at least one item in the ongoingTodos array
      if (item) {
        try {
          const response = await axiosSecure.patch(`/update-status/${item._id}`, { status: item.status });

          if (response.data.modifiedCount > 0) {
            console.log(response.data);
          } else {
            console.error('Failed to update status:', response.data.error);
          }
        } catch (error) {
          console.error('Error updating status:', error);
        }
      }
    };

    postData();
  }, [ongoingTodos,axiosSecure]);
  // complete Update
  useEffect(() => {
    const postData = async () => {
      console.log(completedTodos);
      const item = completedTodos[completedTodos.length - 1];

      // Make sure there is at least one item in the ongoingTodos array
      if (item) {
        try {
          const response = await axiosSecure.patch(`/update-status/${item._id}`, { status: item.status });

          if (response.data.modifiedCount > 0) {
            console.log(response.data);
          } else {
            console.error('Failed to update status:', response.data.error);
          }
        } catch (error) {
          console.error('Error updating status:', error);
        }
      }
    };

    postData();
  }, [completedTodos,axiosSecure]);
  // todo upate
  useEffect(() => {
    const postData = async () => {
      console.log(todos);
      const item = todos[todos.length - 1];

      // Make sure there is at least one item in the ongoingTodos array
      if (item) {
        try {
          const response = await axiosSecure.patch(`/update-status/${item._id}`, { status: item.status });

          if (response.data.modifiedCount > 0) {
            console.log(response.data);
          } else {
            console.error('Failed to update status:', response.data.error);
          }
        } catch (error) {
          console.error('Error updating status:', error);
        }
      }
    };

    postData();
  }, [todos,axiosSecure]);





  useEffect(() => {
    setTodos(data?.todo)
    setCompletedTodos(data?.completed)
    setOngoingTodos(data?.ongoing)
  }, [data])
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
        setCompletedTodos((prev) => [...prev, { ...draggedTodo, status: 'Completed' }]);
      } else if (target === 'ongoing') {
        // Move from Todo to Ongoing
        setOngoingTodos((prev) => [...prev, { ...draggedTodo, status: 'Ongoing' }]);
      }

      setTodos((prev) => prev.filter((item) => item.id !== draggedTodo.id));
    } else if (completedDraggedTodo) {
      if (target === 'todo') {
        // Move from Complete to Todo
        setTodos((prev) => [...prev, { ...completedDraggedTodo, status: 'Todo' }]);
      } else if (target === 'ongoing') {
        // Move from Complete to Ongoing
        setOngoingTodos((prev) => [...prev, { ...completedDraggedTodo, status: 'ongoing' }]);
      }

      setCompletedTodos((prev) => prev.filter((item) => item.id !== completedDraggedTodo.id));
    } else if (ongoingDraggedTodo) {
      if (target === 'todo') {
        // Move from Ongoing to Todo
        setTodos((prev) => [...prev, { ...ongoingDraggedTodo, status: 'Todo' }]);
      } else if (target === 'complete') {
        // Move from Ongoing to Complete
        setCompletedTodos((prev) => [...prev, { ...ongoingDraggedTodo, status: 'Completed' }]);
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
              key={todo?.id}
              draggable
              onDragStart={(e) => handleDragStart(e, todo?.id)}
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
