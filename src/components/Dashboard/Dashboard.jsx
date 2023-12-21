// AllInOneComponent.js
import { useContext } from 'react';

import { NavLink, Outlet } from 'react-router-dom';
import { FaArrowUp, FaShoppingCart  } from 'react-icons/fa';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Dashboard = () => {
  const { user } = useContext(AuthContext)



  return (
    <div className='grid grid-cols-12 gap-5'>
      <div className="col-span-3 h-screen bg-[#be9a0b]">
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
                <FaArrowUp className="text-2xl"></FaArrowUp>
                <span className="text-xl">Home</span>
              </div>
            </NavLink>
            <NavLink className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-black" : ""
            } to='/dashboard/add-task'>
              <div className='flex items-center gap-3'>
                <FaShoppingCart className="text-2xl"></FaShoppingCart>
                <span className="text-xl">Add Task</span>
              </div>
            </NavLink>
            <NavLink className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "text-black" : ""
            } to='/dashboard/tasks'>
              <div className='flex items-center gap-3'>
                <FaShoppingCart className="text-2xl"></FaShoppingCart>
                <span className="text-xl">All Tasks</span>
              </div>
            </NavLink>
          </div>

        </div>
      </div>
      <div className='col-span-9'>
          <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
