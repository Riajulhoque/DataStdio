import React from 'react';
import Followers from "../../../assets/Followers.png"
import Likes from "../../../assets/Likes.png"
import LikesA from "../../../assets/LikesA.png"
import Visitors from "../../../assets/Visitors.png"
import Graph from "../../../assets/group 420.png"
const ManagementSolution = () => {
  return ( 
    <div className='flex '>
      <div className="info w-[55%]">
        <h2 className='text-[#7370FF] text-6xl font-bold pt-[130px] pl-[50px]'>Social media <br />management solution</h2>
        <p className='text-xl pt-[20px] pl-[50px] text-[#797979] w-[50%] pb-[50px]'>Thousands of users rank Agorapulse above Hootsuite and Sprout Social for its features, ease of use, and value for money.</p>

        <div className='mt-[30px] ml-[50px] w-[50%] pb-[40px]'>
          <div className="collapse collapse-arrow bg-base-100 border border-[#a855f7] hover:shadow-md">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-semibold">Insightful Analytics</div>
            <div className="collapse-content text-sm">
              <p className="text-[#787878] pb-[25px]">Create beautiful and actionable reports that reveal what’s working—and what isn’t.
               </p>
              <a href="#"  className="text-[#3B49CF] text-semibold pb-[25px]">Learn more</a>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-100 border border-[#a855f7] mt-[30px] shadow-md">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-semibold">Unified Social Inbox</div>
            <div className="collapse-content text-sm"><p className="text-[#787878] pb-[25px] "> Click on "Forgot Password" on the login page and follow the instructions sent to your email.</p>
            <a href="#"  className="text-[#3B49CF] text-semibold pb-[25px]">Learn more</a></div>
          </div>
        </div>
      </div>

      <div className="image mt-[80px] w-[40%] ">
        <img className='w-[90%] mt-[210px] shadow-md' src={Graph} alt="" />
      </div>
    </div>
  );
};

export default ManagementSolution;