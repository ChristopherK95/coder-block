import { motion } from 'framer-motion';
import styled from 'styled-components';

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  max-height: 600px;
  background-color: #2a2a2b;
  color: white;
  border-radius: 0px 0px 8px 8px;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  scrollbar-width: thin;
  overflow-y: auto;
  outline: none;
  box-shadow: -8px 12px 3px 1px rgba(0, 0, 0, 0.3);

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
  display: flex;
  align-items: center;
  margin: 0;
  padding: 5px 80px 5px 20px;
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
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
  padding: 5px 10px 5px 20px;
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

export const ExpandedSection = styled.div<{ toggledLocation: boolean }>`
  padding: 5px 0 5px 25px;
  background: #48484a;
  filter: ${(p) => (p.toggledLocation ? 'brightness(1.7)' : 'brightness(1)')};
  user-select: none;
  cursor: pointer;
  :hover {
    background-color: ${(p) => (p.toggledLocation ? '' : '#5e5e5e')};
  }
  :active {
    background-color: #303030;
    opacity: 1;
  }
`;

export const ArrowContainer = styled.div`
  align-self: center;
  position: relative;
  cursor: pointer;
  border-radius: 4px;
`;

export const Arrow = styled(motion.div)<{ expanded: boolean }>`
  height: 10px;
  width: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  fill: white;
`;

export const NameContainer = styled.div`
  width: 80%;
  padding-right: 30px;
  position: relative;
`;

export const Circle = styled.div`
  position: absolute;
  left: 5px;
  width: 10px;
  height: 10px;
  background-color: rgb(46, 204, 11);
  border-radius: 100%;
`;
