import styled from "styled-components";
import { devices } from "../../utils/Constant";

export const WrapperOrder = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;

  @media only screen and ${devices.md} {
    flex-wrap: wrap;
  }
`;
