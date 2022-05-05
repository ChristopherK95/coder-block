import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #121212;
  /* background: linear-gradient(to right, #cb1d90, #bf342a, #e87a14); */
  width: 100%;
  flex-direction: column;
  padding-top: 3%;
  padding-bottom: 3%;
  height: calc(100% - 85px);
  box-sizing: border-box;
  overflow: auto;
`;

export const JobContainer = styled.div`
  position: relative;
  width: 1000px;
  height: fit-content;
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: -6px 6px 3px 3px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  color: white;
`;

export const TopContainer = styled.div`
  position: relative;
  width: fill;
  background-color: #303030;
  border-radius: 8px 8px 0 0;
  padding: 35px 45px 20px 45px;
  border-bottom: solid #48bf5a 1px;
`;

export const JobTitle = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: white;
  margin: 0px 0 20px 0px;
`;

export const SubTitle = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #dfdfdf;
  margin: 0 0 0 0px;
  display: flex;
`;

export const ApplyLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 40px;
  margin: 0px 0 10px 0;
  background: #48bf5a;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  position: relative;
  align-self: center;
  font-size: 16px;
  grid-row: span 2;
  :hover {
    filter: brightness(1.1);
  }
  :active {
    transform: scale(0.97);
  }
`;

export const PublishedDate = styled.h2`
  margin: 0 0 0px 0;
  font-size: 14px;
  font-family: Epilogue-Light;
  color: #dfdfdf;
`;

export const LastApplicationDate = styled.h2`
  margin: 0 0 0px 0;
  font-size: 14px;
  font-family: Epilogue-Light;
  color: #dfdfdf;
`;

export const Email = styled.h2`
  margin: 0 0 20px 0px;
  font-size: 14px;
  color: #dfdfdf;
  font-family: Epilogue-Light;
`;

export const Municipality = styled.h2`
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #a0a0a0;
`;

export const ApplyContainer = styled.div`
  display: grid;
  grid-template-columns: 160px auto;
  grid-template-rows: 20px 20px;
  grid-template-areas:
    'main side'
    'main side';
`;

export const Positions = styled.div`
  margin: 0px 0 0 10px;
  color: white;
  font-size: 18px;
  display: flex;
  align-items: flex-end;
`;

export const KeywordsContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

export const Desc = styled.p`
  color: white;
  font-size: 16px;
  margin: 25px 45px 25px 45px;
  white-space: break-spaces;
`;
