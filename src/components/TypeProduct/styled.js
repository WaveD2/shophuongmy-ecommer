import styled from "styled-components";

export const WrapperType = styled.div`
  position: relative;
  padding: 8px 10px;
  cursor: pointer;
  transition: all 3s ease;
  color: #333;

  &::after {
    content: " ";
    position: absolute;
    top: 10px;
    left: 0;
    height: 100%;
    width: 100%;
  }

  &:hover {
    border-bottom: 2px solid #333;
    border-radius: 4px;
  }

  &:hover section {
    display: block;
  }
`;
export const WrapperMenuItem = styled.section`
  display: none;
  position: absolute;
  top: 36px;
  left: 0;
  padding: 10px;
  min-width: max-content;
  background-color: #ccc;
  z-index: 999;
  transition: all 0.3s ease;

  & > h3 {
    &:hover {
      color: #fff;
      transition: inherit;
    }
  }
`;
