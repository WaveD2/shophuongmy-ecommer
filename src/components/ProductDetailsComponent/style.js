import { Col, Image, InputNumber, Row } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
  height: 100%;
  width: 100%;
  max-width: 100px;
  min-width: 100px;
  min-height: 100px;
  max-height: 100px;
  object-fit: none;
  @media only screen and (max-width: 450px) {
    max-width: calc(100vw / 5 - 10px);
    min-width: calc(100vw / 5 - 10px);
    width: 70px !important;
    height: auto;
  }
`;
export const WrapperStyleImageBig = styled(Image)`
  height: 100%;
  width: 100%;
  object-fit: none;

  @media only screen and (max-width: 850px) {
    object-fit: contain;
  }
  @media only screen and (max-width: 450px) {
    width: 350px !important;
  }
`;

export const ContainerDetailProduct = styled(Row)`
  padding: 0 10px;
  background: "#fff";
  border-radius: 4px;
  height: 100%;
  flex-flow: unset;
  @media only screen and (max-width: 850px) {
    flex-direction: column;
  }
`;
export const WrapperColImage = styled(Row)`
  flex-direction: column;
  gap: 4px;
  margin-right: 30px;
  @media only screen and (max-width: 850px) {
    flex-direction: row;
  }
`;
export const ContainerColImage = styled(Col)`
  border-right: 1px solid #e5e5e5;
  display: flex;
  min-width: 670px;

  @media only screen and (max-width: 850px) {
    flex-direction: column-reverse;
    gap: 10px;
  }
`;
export const WrapperStyleColImage = styled(Col)`
  display: flex;
  object-fit: cover;

  @media only screen and (max-width: 450px) {
    flex: none !important;
  }
`;

export const WrapperStyleNameProduct = styled.h1`
  color: rgb(36, 36, 36);
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  word-break: break-word;
  text-transform: capitalize;
`;

export const WrapperStyleTextSell = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;

export const WrapperPriceProduct = styled.div`
  border-radius: 4px;
`;

export const WrapperPriceTextProduct = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 10px;
  align-items: center;
`;

export const WrapperAddressProduct = styled.div`
  margin: 14px 0;
`;

export const WrapperQualityProduct = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  width: 120px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const WrapperInputNumber = styled(InputNumber)`
  &.ant-input-number.ant-input-number-sm {
    width: 40px;
    border-top: none;
    border-bottom: none;
    .ant-input-number-handler-wrap {
      display: none !important;
    }
  }
  & > .ant-input-number-input {
    text-align: center;
  }
`;

export const BoxInDecrease = styled.div`
  margin: 0 0 20px;
  padding: 10px 0;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const BoxColorProduct = styled.div`
  width: 25px;
  height: 25px;
  outline: none;
  border-radius: 50%;
  border: 1px solid #ccc;

  &.active {
    border: 2px solid #e493bfe0 !important;
  }
`;
