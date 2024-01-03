import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
  min-width: 200px;
  width: calc(100% / 5 - 15px);
  & img {
    max-height: 200px;
    width: 100%;
  }
  position: relative;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#fff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
