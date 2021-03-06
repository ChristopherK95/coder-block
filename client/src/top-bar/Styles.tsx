import styled from 'styled-components';

export const Container = styled.div`
  background-color: #1e1e1e;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0;
  padding: 5px 0;
  z-index: 1000;
  box-shadow: 0px 6px 3px 3px rgba(0, 0, 0, 0.3);
  height: 75px;
`;

export const Content = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 100%;
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

export const LogoContainer = styled.i`
  display: block;
  height: 100%;
  cursor: pointer;
  svg {
    height: 100%;
    width: 360px;
  }

  #g101820 {
    filter: drop-shadow(10px 35px 10px rgba(0, 0, 0, 0.5));
  }
`;
