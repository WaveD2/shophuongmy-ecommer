import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #000;
  font-size: 14px;
`;

export const WrapperUploadFile = styled(Upload)`
  & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  & .ant-upload-list-item-info {
    display: none;
  }
  & .ant-upload-list-item {
    display: none;
  }
`;
export const WrapperBoxDetailModal = styled.div`
  display: flex;
  gap: 8px;
  padding: 0px 4px;
  border-radius: 4px;
  margin-bottom: 4px;
  border: 2px solid #ccc;
`;

export const TextModal = styled.p`
  margin: 4px 0;
`;

export const WrapperNameChart = styled.div``;
