import React from "react";
import { LabelInput, WrapperUploadFile } from "./style";
import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";

const FormImage = ({
  maxCount,
  isImages,
  srcAvatar,
  onchangeAvatar,
  ...rest
}) => {
  return (
    <div>
      <LabelInput htmlFor="avatar">Avatar</LabelInput>
      <WrapperUploadFile
        onChange={onchangeAvatar}
        maxCount={maxCount}
        {...rest}>
        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
      </WrapperUploadFile>
      {srcAvatar && (
        <img
          id="avatar"
          name="avatar"
          src={srcAvatar}
          style={{
            height: "60px",
            width: "60px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          alt="avatar"
        />
      )}
    </div>
  );
};

export default FormImage;
