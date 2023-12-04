import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
  height: 100%;
  width: 100%;
  object-fit: none;
`;

export const WrapperStyleColImage = styled(Col)`
  display: flex;
  max-width: 100px;
  min-width: 100px;
  min-height: 100px;
  max-height: 100px;
  object-fit: cover;
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
  background: rgb(250, 250, 250);
  border-radius: 4px;
`;

export const WrapperPriceTextProduct = styled.div`
  display: flex;
  gap: 18px;
  margin-right: 8px;
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
