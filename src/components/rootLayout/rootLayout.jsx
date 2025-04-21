import React from 'react';
import { Outlet } from 'react-router-dom';
import RootLeft from '../../components/rootLayout/rootLeft.jsx';

const RootLayout = () => {
  return (
    <div className='bg-green-300 w-full h-screen flex gap-x-4 p-4'>
        <RootLeft/>
        <Outlet/>
    </div>
  )
}

export default RootLayout