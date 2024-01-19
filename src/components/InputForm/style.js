import { Input, Upload, Select, Form, Radio } from "antd";
import styled from "styled-components";
import { Formik, Field } from "formik";

export const ContainerInput = styled.div`
  display: flex;
  @media only screen and (max-width: 830px) {
    display: block;
  }
`;

export const WrapperInputStyle = styled(Field)`
  border-top: none;
  border-right: none;
  border-left: none;
  outline: none;
  width: 100%;
  padding: 8px;
  padding-left: 10px;
  &:focus {
    background-color: rgb(232, 240, 254);
  }
  @media only screen and (max-width: 830px) {
    width: 100%;
  }
`;

export const LabelInput = styled.label`
  text-transform: capitalize;
  font-size: 17px;
  color: #0c0c0c;
  font-weight: 600;
  display: inline-block;
  margin: 10px 0;
  min-width: 100px;
  max-width: 180px;
  /* white-space: nowrap; */
  @media only screen and (max-width: 830px) {
    width: 100%;
  }
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
  margin: 6px 0;
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  width: 100%;
  border-radius: 4px;
  padding: 16px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  text-wrap: nowrap;
`;
