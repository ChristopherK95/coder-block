import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #333537;
  /* background: linear-gradient(to right, #cb1d90, #bf342a, #e87a14); */
  width: 100%;
  flex-direction: column;
  min-height: 100%;
  background-color: #121212;
`;

export const Content = styled.div`
  height: 97vh;
  overflow: auto;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Align = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 640px;
`;

export const JobContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-items: center;
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  z-index: 5;
  background-color: #121212;
`;
