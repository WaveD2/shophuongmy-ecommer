import { Image } from "antd";
import React from "react";
import Slider from "react-slick";

const SliderComponent = ({ arrImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
  };
  return (
    <div>
      <Slider {...settings}>
        {arrImages?.map((img, index) => (
          <Image
            src={img}
            key={index}
            alt="slider"
            preview={false}
            width="100%"
            height="247px"
          />
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
