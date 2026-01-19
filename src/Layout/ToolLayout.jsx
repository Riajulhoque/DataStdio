import React from 'react';
import Navber from '../Pages/Public/Navber';
import { Outlet } from 'react-router';
import Sidebar from '../Pages/Tool/SideBar';

const ToolLayout = () => {
 
  return (
    <div className='flex gap-7'>
      <Sidebar></Sidebar>
      
      <Outlet className='w-[]'></Outlet>
      
    </div>
  );
};

export default ToolLayout;

