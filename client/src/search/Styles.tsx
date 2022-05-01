import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  margin-top: 100px;
  margin-bottom: 50px;
`;

export const SearchContainer = styled.div`
  position: relative;
  background-color: #1e1e1e;
  padding: 20px 20px 20px 20px;
  border-radius: 8px 8px 8px 0px;
  box-shadow: -6px 6px 3px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 0px;
  z-index: 0;
`;

export const SearchBar = styled.input`
  width: 600px;
  height: 60px;
  border-radius: 5px;
  background-color: white;
  border: none;
  font-size: 20px;
  padding: 0 10px;
  box-sizing: border-box;
`;

export const Filter = styled.div<{ visible: boolean }>`
  box-shadow: -8px 10px 3px 1px rgba(0, 0, 0, 0.3);
  background-color: #1e1e1e;
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 10px;
  position: relative;
  z-index: 10;
  border-radius: ${(p) => (p.visible ? '0' : '0 0 8px 8px')};
  align-items: center;
`;

export const FilterButton = styled.div<{
  toggled: boolean;
  dropdownToggled: boolean;
  version: 'Keywords' | 'Locations' | '';
}>`
  position: relative;
  background-color: ${(p) => (p.toggled ? '#2a2a2b' : 'transparent')};
  border-radius: ${(p) => (p.dropdownToggled ? '0' : '0 0 8px 8px')};
  ${(p) =>
    p.toggled && p.version === 'Keywords'
      ? 'border-top-right-radius: 5px;'
      : ''}
  ${(p) =>
    p.toggled && p.version === 'Locations'
      ? 'border-top-left-radius: 5px;'
      : ''}
  width: fit-content;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  user-select: none;
  :hover {
  }
`;

export const Divider = styled.div<{ dropdownToggled: boolean }>`
  height: 20px;
  width: 2px;
  position: relative;
  background-color: ${(p) => (p.dropdownToggled ? 'transparent' : '#48bf5a')};
`;
