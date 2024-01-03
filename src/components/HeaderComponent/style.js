import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const ContainerHeader = styled.div`
  display: flex;
  background: #1e1e1e;
  justify-content: center;
  height: 70px;
`;

export const WrapperHeader = styled(Row)`
  background-color: var(--primary-color);
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
  width: 1270px;
  padding: 10px 0;
`;

export const WrapperTextHeader = styled(Link)`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: left;
  &:hover {
    color: #ccc;
  }
  @media only screen and (max-width: 830px) {
    font-size: 14px;
  }
`;

export const WrapperHeaderAccout = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
  max-width: 200px;
`;

export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
`;

export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(26, 148, 255);
  }
`;

export const WrapperBoxAccount = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;
export const ContainerBoxAccount = styled.div`
  position: absolute;
  background-color: rgba(177, 126, 211, 0.73);
  top: 100%;
  margin-top: 14px;
  padding: 6px 10px;
  width: max-content;
  z-index: 999;
`;
export const WrapperTippy = styled.div`
  width: 100%;
  max-height: 280px;
  display: flex;
  flex-direction: column;
  position: absolute;
  gap: 6px;
  z-index: 999;
  background: #fff;
  overflow-y: scroll;
  border-radius: 4px;
  padding-bottom: 12px;
`;
export const BoxTippy = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  border-radius: 2px;
  flex-shrink: 1;
  background: rgb(204, 204, 204);

  &:hover {
    background: "#e7d0d0";
  }
`;

export const SettingUser = styled.div`
  cursor: pointer;
  max-width: 100%pointer;
  text-overflow: ellipsispointer;
  height: 40px;

  @media only screen and (max-width: 830px) {
    display: none;
  }
`;
