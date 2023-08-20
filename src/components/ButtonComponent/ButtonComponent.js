import { Button } from "antd";
import React from "react";

const ButtonComponent = ({
  type,
  size,
  styleButton,
  styleTextButton,
  textButton,
  disabled,
  ...rests
}) => {
  return (
    <button
      style={{
        ...styleButton,
        background: disabled ? "#ccc" : styleButton.background,
      }}
      size={size}
      type={type}
      {...rests}>
      <span style={styleTextButton}>{textButton}</span>
    </button>
  );
};

export default ButtonComponent;
