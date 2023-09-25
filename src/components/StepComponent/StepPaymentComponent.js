import React from "react";

const StepPaymentComponent = ({ listSteps }) => {
  return (
    <div>
      {listSteps?.map((text, index) => (
        <p key={index}>
          Bước {index + 1} :<span> {text}</span>
        </p>
      ))}

      <ul>
        <li>Zalo : 0988233528</li>
        <li>Facebook : Đăng Tùng (Waved) </li>
        <li>Sdt : 0988233528</li>
      </ul>
    </div>
  );
};

export default StepPaymentComponent;
