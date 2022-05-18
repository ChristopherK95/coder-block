import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 150px;
  gap: 15px;
  padding-bottom: 25px;
`;

export const PaginationBtn = styled.button<{ selected?: boolean }>`
  width: 50px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: ${(p) => (p.selected ? '#48bf5a' : '#1e1e1e')};
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: consolas;
  font-weight: bold;
  color: ${(p) => (p.selected ? 'black' : 'white')};
  box-shadow: -6px 6px 3px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  ${(p) =>
    !p.selected &&
    `:hover {
      background: #313131;
    }`}
`;
