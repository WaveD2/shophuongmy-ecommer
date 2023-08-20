import { Modal } from "antd";
import React from "react";

const ModalComponent = ({
  titleModal,
  isOpen = false,
  children,
  handleOk,
  handleCancel,
  textModal,
  ...rests
}) => {
  return (
    <Modal
      title={titleModal}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      {...rests}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
