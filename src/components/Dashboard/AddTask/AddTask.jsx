import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../AxiosSecure/useAxiosSecure';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import useTasks from '../../useTasks/useTasks';

function AddTask() {
    const { data, isLoading } = useTasks()
    
    const count = data?.result?.length + 1
    console.log(count);
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const newTask = {
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            priority: data.priority,
            email: user?.email,
            status : 'Todo',
            id : count
        };

        console.log(newTask);

        try {
            const res = await axiosSecure.post('/my-task', newTask);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Task Added Successful!',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
    if (isLoading) return <div className='flex items-center justify-center h-screen'><span className="loading loading-spinner loading-lg"></span></div>
    return (
        <div className="mx-auto lg:mt-8 p-2 mr-2 bg-gray-200 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Create a New <span className='text-yellow-500'>Task</span></h2>
            <div className='h-1 w-24 bg-yellow-500 mx-auto'></div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block font-medium text-gray-600">
                        Title:
                    </label>
                    <input
                        placeholder="Type Task Title"
                        type="text"
                        name="title"
                        id="title"
                        className="mt-1 p-2 w-full border rounded-md"
                        {...register('title', { required: true })}
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block font-medium text-gray-600">
                        Description:
                    </label>
                    <textarea
                        rows="6"
                        placeholder="Type Task Descriptions"
                        name="description"
                        id="description"
                        className="mt-1 p-2 w-full border rounded-md"
                        {...register('description', { required: true })}
                    />
                </div>
                <div>
                    <label htmlFor="deadline" className="block font-medium text-gray-600">
                        Deadline:
                    </label>
                    <input
                        type="date"
                        name="deadline"
                        id="deadline"
                        className="mt-1 p-2 w-full border rounded-md"
                        {...register('deadline', { required: true })}
                    />
                </div>
                <div>
                    <label htmlFor="priority" className="block font-medium text-gray-600">
                        Priority:
                    </label>
                    <select
                        name="priority"
                        id="priority"
                        className="mt-1 p-2 w-full border rounded-md"
                        {...register('priority', { required: true })}
                    >
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="flex items-center justify-center">
                    <button type="submit" className="bg-yellow-500 text-white px-10 my-2 py-3 rounded-md">
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTask;
