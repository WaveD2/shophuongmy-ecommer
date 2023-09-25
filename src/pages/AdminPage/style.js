import styled from "styled-components";

export const ContainerAdminPage = styled.div`
  display: flex;
  overflow-x: hidden;
  flex-wrap: nowrap;
  @media only screen and (max-width: 830px) {
    flex-wrap: wrap;
  }
`;

export const WrapperMenuLeft = styled.div`
  width: 256px;
  box-shadow: 1px 1px 2px #ccc;

  @media only screen and (max-width: 830px) {
    width: 100%;
  }
`;
