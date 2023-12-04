import styled from "styled-components";

export const WrapperType = styled.div`
  position: relative;
  padding: 8px 10px;
  cursor: pointer;
  transition: all 3s ease;
  color: #333;

  &:hover {
    transition: all 3s ease-in-out;

    &::after {
      content: " ";
      position: absolute;
      top: 18px;
      left: 0px;
      height: 18px;
      width: 100%;
      border-bottom: 2px solid #020202;
    }
  }

  &:hover section {
    border-radius: 2px;
    display: block;
    padding-bottom: 3px;
  }
`;
export const WrapperMenuItem = styled.section`
  display: none;
  position: absolute;
  top: 36px;
  left: 0;
  min-width: max-content;
  background-color: #ccc;
  z-index: 999;
  transition: all 0.3s ease;

  div {
    padding: 8px 24px;
    margin: 0 auto;
    & > h3 {
      margin-bottom: 0;
    }
    &:hover {
      background-color: #47434359;
      color: #fcfcfc;
      transition: inherit;
    }
  }
`;
