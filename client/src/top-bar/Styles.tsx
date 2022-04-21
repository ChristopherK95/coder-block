import styled from 'styled-components';

export const Container = styled.div`
  background-color: #1c1b1f;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  padding: 5px 0;
  z-index: 1000;
  box-shadow: 0px 6px 3px 3px rgba(0, 0, 0, 0.3);
`;

export const Content = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: white;
  user-select: none;
`;

export const LinksContainer = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  left: calc(100% + 10px);
  top: 12px;
`;

export const Link = styled.p`
  font-weight: bold;
  font-size: 16px;
  color: #cacaca;
  padding: 0;
  margin: 0;
  cursor: pointer;
  :hover {
    color: white;
  }
`;
