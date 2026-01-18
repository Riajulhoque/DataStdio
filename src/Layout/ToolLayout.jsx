import React from 'react';
import Navber from '../Pages/Public/Navber';
import { Outlet } from 'react-router';

const ToolLayout = () => {
  return (
    <div>
      <Navber></Navber>
      <Outlet></Outlet>
      
    </div>
  );
};

export default ToolLayout;