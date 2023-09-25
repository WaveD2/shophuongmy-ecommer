import styled from "styled-components";

export const WrapperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #69696987;
  height: 100vh;
`;

export const WrapperBox = styled.div`
  max-width: 800px;
  border-radius: 6px;
  background: #fff;
  display: flex;
  z-index: 9999;
`;

export const WrapperContainerLeft = styled.div`
  flex: 1;
  padding: 40px 45px 24px;
  display: flex;
  flex-direction: column;
`;

export const WrapperTextLight = styled.span`
  color: rgb(13, 92, 182);
  font-size: 13px;
  cursor: pointer;
`;
