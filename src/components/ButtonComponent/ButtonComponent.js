import { Button } from "antd";
import React from "react";

const ButtonComponent = ({
  type,
  size,
  styleButton,
  styleTextButton,
  textButton,
  isDisabled,
  ...rests
}) => {
  return (
    <button
      disabled={isDisabled}
      style={{
        ...styleButton,
        background: isDisabled ? "#ccc" : styleButton.background,
      }}
      size={size}
      type={type}
      {...rests}>
      <span style={styleTextButton}>{textButton}</span>
    </button>
  );
};

export default ButtonComponent;
