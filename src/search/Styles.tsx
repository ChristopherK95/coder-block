import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SearchContainer = styled.div`
  position: relative;
  background-color: #1e1d1dad;
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
  background-color: #1e1d1dad;
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 40px;
  margin-bottom: 10px;
  position: relative;
  z-index: 10;
  border-radius: ${(p) => (p.visible ? "0" : "0 0 8px 8px")};
  align-items: center;
`;

export const FilterButton = styled.div<{ toggled: boolean }>`
  position: relative;
  background-color: transparent;
  border-radius: ${(p) => (p.toggled ? "0" : "0 0 8px 8px")};
  width: fit-content;
  color: white;
  font-weight: bold;
  padding: 8px 8px 8px 8px;
  font-size: 18px;
  cursor: pointer;
  user-select: none;
  :hover {
  }
`;

export const Splitter = styled.div`
  width: 2px;
  position: relative;
  background-color: black;
  height: 70%;
`;
