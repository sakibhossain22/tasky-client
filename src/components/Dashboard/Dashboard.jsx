// AllInOneComponent.js
import { useContext } from 'react';

import { NavLink, Outlet } from 'react-router-dom';
import { FaArrowUp, FaHome, FaPenAlt, FaShoppingCart, FaTasks } from 'react-icons/fa';
import { AuthContext } from '../AuthProvider/AuthProvider';
import DashboardNav from './DashboardNav/DashboardNav';

const Dashboard = () => {
  const { user } = useContext(AuthContext)



  return (
    <div>
      <div className='hidden lg:block'>
        <div className='grid grid-cols-12 gap-5'>
          <div className='col-span-3 h-screen '>
            <div className="fixed bg-[#be9a0b] h-screen">
              <div className="mx-10 text-white">
                <div className="w-full flex gap-4 items-center  text-center font-bold my-5">
                  <img className='rounded-full w-10' src={user?.photoURL} alt="" />
                  <h1 className="text-xl text-white">{user?.displayName}</h1>
                </div>

                <div className="flex flex-col gap-2">
                  <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-black" : ""
                  } to='/dashboard/home' >
                    <div className='flex items-center gap-3'>
                      <FaHome className="text-2xl"></FaHome>
                      <span className="text-xl">Home</span>
                    </div>
                  </NavLink>
                  <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-black" : ""
                  } to='/dashboard/add-task'>
                    <div className='flex items-center gap-3'>
                      <FaPenAlt className="text-2xl"></FaPenAlt>
                      <span className="text-xl">Add Task</span>
                    </div>
                  </NavLink>
                  <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-black" : ""
                  } to='/dashboard/tasks'>
                    <div className='flex items-center gap-3'>
                      <FaTasks className="text-2xl"></FaTasks>
                      <span className="text-xl">All Tasks</span>
                    </div>
                  </NavLink>
                </div>

              </div>
            </div>
          </div>
          <div className='col-span-9'>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <div className='lg:hidden block'>
        <div>
          <DashboardNav></DashboardNav>
        </div>
        <div className='md:mx-5 mx-2'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
