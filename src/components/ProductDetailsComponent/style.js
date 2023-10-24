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

export const WrapperPriceTextProduct = styled.h1`
  font-size: 32px;
  line-height: 40px;
  margin-right: 8px;
  font-weight: 500;
  margin-top: 10px;
`;

export const WrapperAddressProduct = styled.div`
  margin: 10px 0;

  span.address {
    text-decoration: underline;
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span.change-address {
    color: rgb(11, 116, 229);
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }
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
  margin: 10px 0 20px;
  padding: 10px 0;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  gap: 12px;
  align-items: center;
`;
