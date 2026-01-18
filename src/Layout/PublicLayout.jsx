import React from 'react';
import Navber from '../Pages/Public/Navber';
import { Outlet } from 'react-router';
import Footer from '../Pages/Public/Footer';

const PublicLayout = () => {
  return (
    <div>
      <Navber></Navber>
      <Outlet></Outlet>
      <Footer></Footer>

    </div>
  );
};

export default PublicLayout;