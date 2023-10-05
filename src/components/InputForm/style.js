import { Input, Upload, Select, Form, Radio } from "antd";
import styled from "styled-components";
import { Formik, Field } from "formik";

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
  /* white-space: nowrap; */
`;
export const MessError = styled.div`
  margin: 4px 0;
  color: #e64040;
  font-size: 14px;
`;

export const WrapperUploadFile = styled(Upload)`
  & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    border-radius: 50%;
  }
`;
export const WrapperSelectStyle = styled(Form)``;
// export const WrapperSelectStyle = styled(Select)``;

export const WrapperRadio = styled(Radio.Group)`
  margin-top: 6px;
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  width: 500px;
  border-radius: 4px;
  height: 100px;
  padding: 16px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`;
