import React from 'react';
const Navber = () => {
  return (
    <div className=' pt-[30px]'>
      <div className="navbar bg-[#F1F1F1] shadow-sm rounded-full w-[75%] m-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-[#000]">
       <li><a href='/'>Home</a></li>
      <li><a href='/Pricing'>Price</a></li>      
      <li><a href='/terms'>Rules</a></li>
      <li><a href='/jobs'>JobsPage</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl font-bold text-[#7370FF]" href='/'>Data Stdio</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-[#000] gap-7">
      <li><a href='/'>Home</a></li>
      <li><a href='/Pricing'>Price</a></li>      
      <li><a href='/terms'>Rules</a></li>
      <li><a href='/jobs'>JobsPage</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn text-lg text-[#7370FF] hover:bg-[#7370FF] hover:text-white rounded-xl mr-4">LogIn</a>
  </div>
</div>
    </div>
  );
};

export default Navber;