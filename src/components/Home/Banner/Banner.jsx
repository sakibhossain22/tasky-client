import { Link } from 'react-router-dom';
import img from '../../../assets/banner.jpg'
const Banner = () => {
    return (
        <div className='bg-white mx-5'>
            <div className='flex  gap-10 items-center justify-between'>
                <div className='w-1/2 flex flex-col gap-5'>
                    <p className='text-3xl'>World's No.1</p>
                    <h1 className='text-5xl font-bold '>Best <span className='text-[#f1c40f]'>Task</span> Management System</h1>
                    <p>Tasky is a robust and user-friendly task management system that helps individuals and teams stay organized and productive</p>
                    <Link>
                        <button className='bg-[#f1c40f] px-6 py-3 rounded font-bold'>Let's Explore</button>
                    </Link>
                </div>
                <div className='w-1/2'>
                    <img src={img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;