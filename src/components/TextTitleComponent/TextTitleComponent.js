import React from "react";

const TextTitleComponent = ({ text, style, ...rest }) => {
  return (
    <p style={style} {...rest}>
      {text}
    </p>
  );
};

export default TextTitleComponent;
