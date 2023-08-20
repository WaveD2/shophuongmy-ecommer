import { Input, Upload } from "antd";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";

export const ContainerInput = styled.div`
  display: flex;
`;

export const WrapperInputStyle = styled(Field)`
  border-top: none;
  border-right: none;
  border-left: none;
  outline: none;
  width: 100%;
  padding-left: 10px;
  &:focus {
    background-color: rgb(232, 240, 254);
  }
`;

export const LabelInput = styled.label`
  text-transform: capitalize;
  font-size: 17px;
  color: #0c0c0c;
  font-weight: 600;
  display: inline-block;
  margin: 10px 0;
  width: 280px;
  white-space: nowrap;
`;
export const MessError = styled.div`
  margin: 4px 0;
  color: #e64040;
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
