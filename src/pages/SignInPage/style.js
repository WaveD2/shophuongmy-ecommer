import styled from "styled-components";

export const WrapperContainerLeft = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

export const WrapperContainerRight = styled.div`
  width: 300px;
  background: linear-gradient(
    136deg,
    rgb(240, 248, 255) -1%,
    rgb(219, 238, 255) 85%
  );
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const WrapperTextLight = styled.span`
  color: rgb(13, 92, 182);
  font-size: 13px;
  cursor: pointer;
`;

export const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const WrapperButton = styled.button`
  background: rgb(204, 204, 204);
  height: 48px;
  border: none;
  border-radius: 4px;
  width: 100%;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
