import React from 'react';
import { Outlet } from 'react-router-dom';
import RootLeft from '../../components/rootLayout/rootLeft.jsx';

const RootLayout = () => {
  return (
    <div className='bg-green-300 w-full min-h-screen lg:h-screen flex flex-col lg:flex-row gap-4 p-4 2xl:w-[1400px] 2xl:mx-auto'>
      <RootLeft />
      <Outlet />
    </div>

  )
}

export default RootLayout