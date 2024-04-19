import React from "react";
import imgLoading from "../../assets/images/loading.jpg";

const ImageComponent = ({alt, src, style}) => {
  return (
    <img alt={alt} src={src ? src : imgLoading} style={style} loading='lazy' />
  );
};

export default ImageComponent;
