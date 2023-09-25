import { Image } from "antd";
import React from "react";
import { Carousel } from "antd";

const SliderComponent = ({ arrImages }) => {
  const settings = {
    dots: true,
    waitForAnimate: true,
    infinite: true,
    autoplay: true,
    speed: 2400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 1200,
  };
  return (
    <Carousel {...settings}>
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
    </Carousel>
  );
};

export default SliderComponent;
