import styled from "styled-components";

export const ContainerHome = styled.div`
  max-width: 1270px;
  margin: 0px auto;
  overflow: hidden;
  min-height: 70vh;
`;

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-start;
  height: 44px;
`;

export const WrapperButtonMore = styled.div`
  &:hover {
    color: #fff;
    background: #9255fd;
    span {
      color: #fff;
    }
  }
  width: 100%;
  color: #9255fd;
  text-align: center;
`;

export const ContainerProducts = styled.div`
  margin: 24px;
  padding-bottom: 30px;
`;

export const WrapperProducts = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
