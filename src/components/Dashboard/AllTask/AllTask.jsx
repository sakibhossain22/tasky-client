import { useContext, useEffect, useState } from 'react';
import useTasks from '../../useTasks/useTasks';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../AxiosSecure/useAxiosSecure';
import { MdDeleteSweep } from "react-icons/md";
import { useToasts } from 'react-toast-notifications';
const AllTask = () => {
  const { addToast } = useToasts();
  const { data, refetch} = useTasks()
  console.log(data);
  const { loading } = useContext(AuthContext)
  const [todos, setTodos] = useState();
  const [completedTodos, setCompletedTodos] = useState([]);
  const [ongoingTodos, setOngoingTodos] = useState([]);
  const axiosSecure = useAxiosSecure()
  // onGOing Update
  useEffect(() => {
    const postData = async () => {
      console.log(ongoingTodos);
      const item = ongoingTodos[ongoingTodos?.length - 1];

      // Make sure there is at least one item in the ongoingTodos array
      if (item) {
        try {
          const response = await axiosSecure.patch(`/update-status/${item?._id}`, { status: item?.status });

          if (response?.data?.modifiedCount > 0) {
            const toast = addToast('Task Updated !', {
              appearance: 'info',
              autoDismiss: true, 
              autoDismissTimeout: 2000,
            });
          } else {
            console.error('Failed to update status:', response?.data.error);
          }
        } catch (error) {
          console.error('Error updating status:', error);
        }
      }
    };

    postData();
  }, [ongoingTodos,addToast, axiosSecure]);
  // complete Update
  useEffect(() => {
    const postData = async () => {
      const item = completedTodos[completedTodos?.length - 1];

      // Make sure there is at least one item in the ongoingTodos array
      if (item) {
        try {
          const response = await axiosSecure.patch(`/update-status/${item?._id}`, { status: item?.status });

          if (response.data.modifiedCount > 0) {
            const toast = addToast('Task Updated !', {
              appearance: 'info',
              autoDismiss: true, 
              autoDismissTimeout: 2000,
            });
          } else {
            console.error('Failed to update status:', response?.data.error);
          }
        } catch (error) {
          console.error('Error updating status:', error);
        }
      }
    };

    postData();
  }, [completedTodos,addToast, axiosSecure]);
  // todo upate
  useEffect(() => {
    const postData = async () => {
      const item = todos[todos?.length - 1];

      if (item) {
        try {
          const response = await axiosSecure.patch(`/update-status/${item?._id}`, { status: item?.status });

          if (response?.data?.modifiedCount > 0) {
            const toast = addToast('Task Updated !', {
              appearance: 'info',
              autoDismiss: true, 
              autoDismissTimeout: 2000,
            });
          } else {
            console.error('Failed to update status:', response?.data.error);
          }
        } catch (error) {
          console.error('Error updating status:', error);
        }
      }
    };

    postData();
  }, [todos,addToast, axiosSecure]);


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
        setCompletedTodos((prev) => [...prev, { ...draggedTodo, status: 'Completed' }]);
      } else if (target === 'ongoing') {
        setOngoingTodos((prev) => [...prev, { ...draggedTodo, status: 'Ongoing' }]);
      }

      setTodos((prev) => prev.filter((item) => item.id !== draggedTodo.id));
    } else if (completedDraggedTodo) {
      if (target === 'todo') {
        setTodos((prev) => [...prev, { ...completedDraggedTodo, status: 'Todo' }]);
      } else if (target === 'ongoing') {
        setOngoingTodos((prev) => [...prev, { ...completedDraggedTodo, status: 'Ongoing' }]);
      }

      setCompletedTodos((prev) => prev.filter((item) => item.id !== completedDraggedTodo.id));
    } else if (ongoingDraggedTodo) {
      if (target === 'todo') {
        setTodos((prev) => [...prev, { ...ongoingDraggedTodo, status: 'Todo' }]);
      } else if (target === 'complete') {
        setCompletedTodos((prev) => [...prev, { ...ongoingDraggedTodo, status: 'Completed' }]);
      }

      setOngoingTodos((prev) => prev.filter((item) => item.id !== ongoingDraggedTodo.id));
    }
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/task/${id}`)
          .then(res => {
            if (res?.data?.deletedCount > 0) {
              refetch()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })

      }
    });
    console.log(id);

  }
  if (loading) return <div className='flex items-center justify-center h-screen'><span className="loading loading-spinner loading-lg"></span></div>
  return (
    <div className='lg:mr-3 mt-2'>
      <div className='overflow-y-auto'>
        <h2 className="text-xl border-l-4 border-red-500 pl-2 uppercase  font-bold mb-2">Todo List</h2>
        <div
          className="py-4 pb-5 h-full"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, 'todo')}
        >
          <div className='grid grid-cols-12 lg:text-base md:text-base text-xs text-white font-bold bg-yellow-500 py-2 rounded mb-2 items-center justify-between px-4'>
            <span className='col-span-3 md:col-span-4 lg:col-span-4'>Title</span>
            <span className='col-span-3 md:col-span-4 lg:col-span-4'>Priority</span>
            <span className='col-span-3 md:col-span-2 lg:col-span-2'>Deadline</span>
            <span className='col-span-3 md:col-span-2 lg:col-span-2 pl-10'>Delete</span>
          </div>
          {todos?.map((todo) => (
            <div
              key={todo?.id}
              draggable
              onDragStart={(e) => handleDragStart(e, todo?.id)}
              className="cursor-pointer bg-yellow-200 p-2 mb-2"
            >
              <div className='grid grid-cols-12  items-center justify-between lg:px-4'>
                <span className='lg:col-span-4 md:col-span-4 col-span-3 lg:text-base text-xs'>{todo.title}</span>
                <span className='lg:col-span-4 md:col-span-4 col-span-3 lg:text-base text-xs '>{todo.priority}</span>
                <span className='lg:col-span-2 md:col-span-2 col-span-3 lg:text-base text-xs '>{todo.deadline}</span>
                <div className='flex  items-center justify-center lg:ml-20 ml-14'>
                  <button className='lg:col-span-2 md:col-span-2 col-span-3 py-2 bg-red-200 px-6' onClick={() => handleDelete(todo?._id)}>
                   <MdDeleteSweep className='text-center mx-auto text-xl'></MdDeleteSweep>
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-y-auto">
        <h2 className="text-xl border-l-4 border-red-500 pl-2 uppercase  font-bold mb-4">Ongoing</h2>
        <div
          className="pb-10 h-full"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, 'ongoing')}
        >
          <div className='grid grid-cols-12 lg:text-base md:text-base text-xs text-white font-bold bg-purple-500 py-2 rounded mb-2 items-center justify-between px-4'>
            <span className='col-span-3 md:col-span-4 lg:col-span-4'>Title</span>
            <span className='col-span-3 md:col-span-4 lg:col-span-4'>Priority</span>
            <span className='col-span-3 md:col-span-2 lg:col-span-2'>Deadline</span>
            <span className='col-span-3 md:col-span-2 lg:col-span-2 pl-10'>Delete</span>
          </div>
          {ongoingTodos?.map((todo) => (
            <div
              key={todo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, todo.id)}
              className="cursor-pointer bg-purple-200 p-2 mb-2"
            >
              <div className='grid grid-cols-12  items-center justify-between lg:px-4'>
                <span className='lg:col-span-4 md:col-span-4 col-span-3 lg:text-base text-xs'>{todo.title}</span>
                <span className='lg:col-span-4 md:col-span-4 col-span-3 lg:text-base text-xs '>{todo.priority}</span>
                <span className='lg:col-span-2 md:col-span-2 col-span-3 lg:text-base text-xs '>{todo.deadline}</span>
                <div className='flex  items-center justify-center lg:ml-20 ml-14'>
                  <button className='lg:col-span-2 md:col-span-2 col-span-3 py-2 bg-red-200 px-6' onClick={() => handleDelete(todo?._id)}>
                   <MdDeleteSweep className='text-center mx-auto text-xl'></MdDeleteSweep>
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-y-auto">
        <h2 className="text-xl border-l-4 border-red-500 pl-2 uppercase  font-bold mb-4">Completed</h2>
        <div
          className="pb-10 h-full"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, 'complete')}
        >
          <div className='grid grid-cols-12 lg:text-base md:text-base text-xs text-white font-bold bg-green-500 py-2 rounded mb-2 items-center justify-between px-4'>
            <span className='col-span-3 md:col-span-4 lg:col-span-4'>Title</span>
            <span className='col-span-3 md:col-span-4 lg:col-span-4'>Priority</span>
            <span className='col-span-3 md:col-span-2 lg:col-span-2'>Deadline</span>
            <span className='col-span-3 md:col-span-2 lg:col-span-2 pl-10'>Delete</span>
          </div>
          {completedTodos?.map((todo) => (
            <div
              key={todo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, todo.id)}
              className="cursor-pointer bg-green-200 p-2 mb-2"
            >
             <div className='grid grid-cols-12  items-center justify-between lg:px-4'>
                <span className='lg:col-span-4 md:col-span-4 col-span-3 lg:text-base text-xs'>{todo.title}</span>
                <span className='lg:col-span-4 md:col-span-4 col-span-3 lg:text-base text-xs '>{todo.priority}</span>
                <span className='lg:col-span-2 md:col-span-2 col-span-3 lg:text-base text-xs '>{todo.deadline}</span>
                <div className='flex  items-center justify-center lg:ml-20 ml-14'>
                  <button className='lg:col-span-2 md:col-span-2 col-span-3 py-2 bg-red-200 px-6' onClick={() => handleDelete(todo?._id)}>
                   <MdDeleteSweep className='text-center mx-auto text-xl'></MdDeleteSweep>
                    </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default AllTask;
