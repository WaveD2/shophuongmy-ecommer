import React from "react";
import { LabelInput, WrapperUploadFile } from "./style";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

const FormImage = ({
  maxCount,
  isImages,
  srcAvatar,
  onchangeAvatar,
  fileList,
  previewOpen,
  previewTitle,
  srcPreviewImage,
  handleCancelPreview,
  handlePreview,
  ...rest
}) => {
  return (
    <div>
      <LabelInput htmlFor="avatar">Avatar</LabelInput>
      <WrapperUploadFile
        onChange={onchangeAvatar}
        onPreview={handlePreview}
        multiple
        maxCount={maxCount}
        fileList={fileList}
        {...rest}>
        {fileList?.length < 6 && (
          <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
        )}
      </WrapperUploadFile>

      {previewOpen && srcPreviewImage && (
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancelPreview}>
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={srcPreviewImage}
          />
        </Modal>
      )}

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
