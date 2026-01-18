import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import EasySolution1 from "../../../assets/EasySolution1.png";
import EasySolution2 from "../../../assets/EasySolution2.png";
import EasySolution3 from "../../../assets/EasySolution3.png";
import EasySolution4 from "../../../assets/EasySolution4.png";
import EasySolution5 from "../../../assets/EasySolution5.png";
import EasySolution6 from "../../../assets/EasySolution6.png";

function Solution_Slider() {
  const settings = {
    infinite: true,
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <div className="mt-[50px] text-center pb-[60px]">
      <h3 className="gradient-text pt-[70px]">
        One easy-to-use solution, <br /> loaded with powerful features.
      </h3>

      <p className="pt-[20px] text-[#797979] pb-[50px]">
        Everything you need to dominate social media—fortified with the industry’s
        <br /> #1 rated customer support.
      </p>

      <Slider {...settings}>
        {[EasySolution1, EasySolution2, EasySolution3, EasySolution4, EasySolution5, EasySolution6].map(
          (img, index) => (
            <div key={index} className="px-4">
              <img src={img} alt="" className="mx-auto" />
            </div>
          )
        )}
      </Slider>
    </div>
  );
}

export default Solution_Slider;
