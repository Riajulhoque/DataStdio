import React from "react";
// import BannerImg from "../../../assets/Banner-img.png"
import SocialMediathatSells from "../../../assets/SocialMediathatSells.jpeg"

const Banner = () => {
  return (
    <div className=" pt-[30px] rounded-xl ">
      <div className="container pb-[50px] flex ">
        <div className="info w-[65%]">
          <h1 className="text-[#7370FF] text-7xl font-bold pt-[130px] pl-[50px]">Take Control <br />of Your Social <br /> Media .</h1>
          <p className="text-xl pt-[20px] pl-[50px] text-[#797979] w-[70%]">
            Tired of juggling disparate tools and incomplete data? <br /> Our unified platform replaces your fragmented stack—scheduling, analytics, engagement, and publishing—with one cohesive, data-driven solution proven to increase team efficiency by up to 40% and accelerate audience growth.
          </p>
          <button className="mt-[40px] m-[20px] ml-[50px] explore-btn">Try for free</button>
          <button className="mt-[40px] m-[20px] ml-[30px] explore-btn">Sign In</button>
        </div>
        <div className="img w-[35%]">
          <div className="ml-[50px] mt-[40px] bg-[#3B49CF] p-[20px] bg-white mr-[10px] rounded-xl shadow-md hover:shadow-none">
          <h4 className="text-xl font-semibold">Social Listing</h4>
          <p className="text-[#787878] ">Discover trends and insights about <br /> your brand—and your competitors.</p>
          <a href="#" className="text-[#3B49CF]"> Learn more</a>
          </div>
          <p></p>
          <img className="rounded-3xl w-[80%] m-[50px]" src={SocialMediathatSells} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
