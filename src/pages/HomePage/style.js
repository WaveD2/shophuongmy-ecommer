import styled from "styled-components";

export const ContainerHome = styled.div`
  max-width: 1270px;
  margin: 0px auto;
  overflow: hidden;
  min-height: 70vh;
`;

export const BoxTypeProduct = styled.section`
  padding: 8px;
  position: fixed;
  left: 0px;
  top: 7%;
  border-radius: 2px;
  color: rgb(51, 51, 51);
  z-index: 99;
  width: 80%;
`;

export const WrapperTypeProduct = styled.div`
  & > div {
    position: relative;
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 40px;
    border-bottom: 2px solid #ccc;
  }

  & > section {
    display: none;
  }
  @media only screen and (max-width: 450px) {
    & > div {
      display: none !important;
    }
    & > section {
      display: block;
    }

    & > section > div {
      position: absolute;
      left: 0;
      top: 0;
      width: 70vw;
      height: 100vh;
      z-index: 80;
      background: #cccccce8;
      padding-top: 50px;
      animation-name: my-animation;
      animation-duration: 0.6s;
      animation-direction: alternate;
      animation-timing-function: ease;

      @keyframes my-animation {
        from {
          transform: translateX(-100px);
        }
        to {
          transform: translateX(0);
        }
      }
    }
  }
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
  margin: 12px 0;
  padding-bottom: 30px;
`;

export const WrapperProducts = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
  width: 100%;

  @media only screen and (max-width: 830px) {
    justify-content: center;
  }

  @media only screen and (max-width: 450px) {
    justify-content: space-around;
    gap: 8px;
  }
`;
