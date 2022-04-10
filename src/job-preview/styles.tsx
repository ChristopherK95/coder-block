import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1e1d1dad;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: -6px 6px 3px 3px rgba(0, 0, 0, 0.3);
`;

export const Title = styled.h1`
  color: white;
  font-size: 20px;
  margin: 0;
`;

export const Company = styled.h2`
  color: white;
  font-size: 16px;
  margin: 0;
`;

export const Municipality = styled.h2`
  color: #b6b6b6;
  font-size: 16px;
  margin: 0;
`;

export const KeywordsContainer = styled.div`
  display: flex;
`;

export const Keyword = styled.p`
  color: #cb1d66;
  font-weight: bold;
  font-size: 14px;
  margin: 0 10px 0 0;
`;
