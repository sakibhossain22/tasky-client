import { Link } from 'react-router-dom';
import women from '../../../assets/women.png'
const RegisterNow = () => {
    return (
        <div className='ml-4 bg-[#fef8e8] lg:flex items-center justify-between'>
            <div className='lg:w-1/2'>
                <p className='text-xl font-bold border-l-4 border-[#f1c40f] pl-3 mb-3'>Register Now !</p>
                <h1 className='lg:text-4xl text-2xl mb-4 font-bold'>Wellcome To Our <span className='text-[#f1c40f]'>Tasky !</span></h1>
                <p className='text-gray-600 mb-5'>Tasky is your all-in-one task management solution, designed to streamline your productivity. With a user-friendly interface, customizable categories, and seamless collaboration features, Tasky helps you organize, prioritize, and accomplish your tasks efficiently. Boost your efficiency, stay on top of deadlines, and transform the way you manage your responsibilities with Tasky.</p>
                <div>
                    <Link  to='/register'>
                        <button className='bg-[#f1c40f] px-6 py-2 rounded my-5'>Register</button>
                    </Link>
                </div>
            </div>
            <div className='lg:w-1/2'>
                <img className='w-full' src={women} alt="" />
            </div>
        </div>
    );
};

export default RegisterNow;