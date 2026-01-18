import React from 'react';
import Banner from './Home/Banner';
import BestSupport from './Home/BestSupport';
import ManagementSolution from './Home/ManagementSolution';
import Reviews from './Home/Reviews';
import Solution_Slider from './Home/Solution_Slider';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <ManagementSolution></ManagementSolution>
      <BestSupport></BestSupport>
      <Solution_Slider></Solution_Slider>
      <Reviews></Reviews>

    </div>
  );
};

export default Home;