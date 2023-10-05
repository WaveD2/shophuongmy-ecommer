import React from "react";
import { Steps } from "antd";
import { CustomStep } from "./style";
const StepPaymentComponent = ({ current = 0, items = [] }) => {
  return (
    <Steps current={current}>
      {items.map((item) => {
        return (
          <CustomStep
            key={item.title}
            title={item.title}
            description={item.description}
          />
        );
      })}
    </Steps>
  );
};

export default StepPaymentComponent;
