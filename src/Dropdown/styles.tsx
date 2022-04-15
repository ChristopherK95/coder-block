import styled from 'styled-components';

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: fit-content;
  max-height: 600px;
  background-color: #1e1d1dad;
  color: white;
  border-radius: 0px 8px 8px 8px;
  /* padding: 10px; */
  position: absolute;
  top: 38px;
  left: 0;
  z-index: 10;
  scrollbar-width: thin;
  overflow-y: auto;
  outline: none;

  ::-webkit-scrollbar {
    width: 8px;
    border-radius: 5px;
    display: block;
    background: #303030;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #565656;
    border-radius: 5px;
  }
`;

export const StyledKeyword = styled.div<{ toggled: boolean }>`
  margin: 0;
  padding: 5px 80px 5px 15px;
  color: ${(p) => (p.toggled ? '#ff405b' : '')};
  background: ${(p) => (p.toggled ? '#FFC329' : '')};
  user-select: none;
  cursor: pointer;
  :hover {
    background-color: ${(p) => (p.toggled ? '' : '#5e5e5e')};
  }
  :active {
    background-color: #303030;
    opacity: 1;
  }
`;

export const StyledLocation = styled.div<{ expanded: boolean }>`
  margin: 0;
  padding: 5px 80px 5px 15px;
  color: ${(p) => (p.expanded ? '#ff405b' : '')};
  background: ${(p) => (p.expanded ? '#FFC329' : '')};
  user-select: none;
  cursor: pointer;
  :hover {
    background-color: ${(p) => (p.expanded ? '' : '#5e5e5e')};
  }
  :active {
    background-color: #303030;
    opacity: 1;
  }
`;

export const ExpandedSection = styled.div`
  padding: 5px;
  background-color: #1e1d1dad;
`;
