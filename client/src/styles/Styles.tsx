import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #333537;
  /* background: linear-gradient(to right, #cb1d90, #bf342a, #e87a14); */
  width: 100%;
  flex-direction: column;
  height: 100vh;
  background-color: #121212;
`;

export const Content = styled.div`
  box-sizing: border-box;
  height: calc(100% - 85px);
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

export const JobCounter = styled.h1`
  color: white;
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: bold;
  font-family: Epilogue-Bold;

  span {
    font-family: Epilogue-Bold;
    font-size: 14px;
    color: #6c6c6c;
  }
`;
