import React from "react";
import { Tooltip } from "antd";
const TooltipComponent = ({ des, title, children, handlerClick }) => {
  return (
    <Tooltip title={title} onClick={handlerClick}>
      {children ? children : <span>{des}</span>}
    </Tooltip>
  );
};

export default TooltipComponent;
