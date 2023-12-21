
import { useContext } from 'react';
import useAxiosSecure from '../../AxiosSecure/useAxiosSecure';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

function AddTask() {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newTask = {
            title: formData.get('title'),
            description: formData.get('description'),
            deadline: formData.get('deadline'),
            priority: formData.get('priority'),
            email : user?.email
        };
        console.log(newTask);
        axiosSecure.post('/my-task', newTask)
        .then(res => {
            if(res.data.insertedId) {
                return Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Task Added Successful!',
                    confirmButtonText: 'OK'
                })
            }
        })
        .catch(error => console.error(error));    
    };

    return (
        <div className="w- mx-auto mt-8 p-4 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Create a New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                        Title:
                    </label>
                    <input placeholder='Type Task Title' type="text" name="title" id="title" className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                        Description:
                    </label>
                    <textarea rows='6' placeholder='Type Task Descriptions' name="description" id="description" className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-600">
                        Deadline:
                    </label>
                    <input type="date" name="deadline" id="deadline" className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-600">
                        Priority:
                    </label>
                    <select name="priority" id="priority" className="mt-1 p-2 w-full border rounded-md">
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className='flex items-center justify-center'>
                    <button type="submit" className="bg-yellow-500 text-white px-10 my-2 py-3 rounded-md">
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTask;
