import { motion } from 'framer-motion';
import styled from 'styled-components';

export const DropdownContainer = styled(motion.div)<{
  toggled: string;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  background-color: #2a2a2b;
  color: white;
  border-radius: 0px 0px 8px 8px;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  scrollbar-width: thin;
  overflow: hidden;
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
  /* ${(p) =>
    p.toggled !== '' &&
    ` ::after {
    opacity: ${p.toggled ? 1 : 0};
    transition: opacity 2s 2s;
    content: '';
    height: 10px;
    display: block;
    width: 8px;
    position: absolute;
    ${p.toggled === 'Keywords' ? 'right: -8px;' : 'left: -8px;'}
    border-radius: ${
      p.toggled === 'Keywords' ? '0px 0px 0px 10px;' : '0px 0px 10px 0px;'
    }
    ${
      p.toggled === 'Keywords'
        ? 'border-left: 5px solid #2a2a2b;'
        : 'border-right: 5px solid #2a2a2b;'
    }
    border-bottom: 5px solid #2a2a2b;
    top: -5px;
  }`} */
`;

export const StyledKeyword = styled(motion.div)<{ toggled: boolean }>`
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

export const StyledLocation = styled(motion.div)<{ expanded: boolean }>`
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

export const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  scrollbar-color: #48bf5a #2a2a2b;
`;

export const SearchBar = styled.input`
  width: 90%;
  height: 30px;
  box-sizing: border-box;
  margin: 15px auto 15px auto;
  background-color: white;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  box-shadow: -3px 3px 5px 2px rgba(0, 0, 0, 0.5);
  :focus {
    outline: solid 2px #48bf5a;
  }
`;

export const Resize = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 25px;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 5px 0 5px 0;
  cursor: row-resize;
  background-color: #505052;
`;

export const ItemContainer = styled(motion.div)<{ toggledLocation: boolean }>`
  padding: 0px 0 0px 25px;
  background: #48484a;
  overflow: hidden;
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

export const ExpandedSection = styled(motion.div)<{ toggledLocation: boolean }>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ExpandedItem = styled(motion.div)`
  height: 25px;
  display: flex;
  align-items: center;
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
  fill: ${(p) => (p.expanded ? '#48bf5a' : 'white')};
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
