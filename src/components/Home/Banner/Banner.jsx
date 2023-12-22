import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import img from '../../../assets/banner.jpg';

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      className='bg-white mx-5 mt-5'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <div className='lg:flex lg:flex-row md:flex md:flex-row sm:flex sm:flex-col-reverse gap-10 items-center justify-between'>
        <motion.div
          className='lg:w-1/2 flex flex-col gap-5'
          variants={itemVariants}
        >
          <p className='text-3xl'>World's No.1</p>
          <h1 className='lg:text-5xl text-3xl font-bold '>
            Best <span className='text-[#f1c40f]'>Task</span> Management System
          </h1>
          <p>
            Tasky is a robust and user-friendly task management system that helps individuals and teams stay organized and productive
          </p>
          <Link to='/login'>
            <button className='bg-[#f1c40f] px-6 py-3 rounded font-bold'>Let's Explore</button>
          </Link>
        </motion.div>
        <motion.div
          className='lg:w-1/2'
          variants={itemVariants}
        >
          <img src={img} alt="" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Banner;
