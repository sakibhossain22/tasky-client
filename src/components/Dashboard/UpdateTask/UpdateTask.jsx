import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../AxiosSecure/useAxiosSecure';
import { useToasts } from "react-toast-notifications";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useParams } from 'react-router-dom';
function UpdateTask() {
    const [updateData, setUpdateData] = useState([])
    const { id } = useParams()
    const { addToast } = useToasts();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();
    const { loading } = useContext(AuthContext)
    const onSubmit = async (data) => {
        const newTask = {
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            priority: data.priority,
        };

        try {
            const res = await axiosSecure.patch(`/update-task/${id}`, newTask);
            if (res?.data?.modifiedCount) {
                console.log(res?.data);
                // eslint-disable-next-line no-unused-vars
                const toast = addToast('Task info Updated !', {
                    appearance: 'success',
                    autoDismiss: true,
                    autoDismissTimeout: 2000,
                });

            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        axiosSecure.get(`/my-task/${id}`)
            .then(res => {
                setUpdateData(res?.data)
            })
    }, [axiosSecure, id])
    if (loading) return <div className='flex items-center justify-center h-screen'><span className="loading loading-spinner loading-lg"></span></div>
    return (
        <div className="mx-auto mt-4 mr-4 p-5 bg-gray-200 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Update The <span className='text-yellow-500'>Task</span></h2>
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
                        defaultValue={updateData?.title}
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
                        defaultValue={updateData?.description}
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
                        defaultValue={updateData?.deadline}
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
                        defaultValue={updateData?.priority}
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
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateTask;
