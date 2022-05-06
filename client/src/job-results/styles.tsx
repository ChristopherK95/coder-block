import { motion } from 'framer-motion';
import styled from 'styled-components';

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
  padding-bottom: 25px;
`;

export const Container = styled(motion.div)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: -6px 6px 3px 3px rgba(0, 0, 0, 0.3);
  width: 640px;
  position: relative;
`;

export const Title = styled.h1`
  color: white;
  font-size: 20px;
  margin: 0 40px 8px 0;
  a {
    color: white;
    text-decoration: none;
    :visited {
      color: #b6b6b6;
    }
  }
`;

export const Company = styled.h2`
  color: #b6b6b6;
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
  margin-top: 10px;
  position: relative;
`;

export const Keyword = styled.p`
  color: #cb1d66;
  font-weight: bold;
  font-size: 14px;
  margin: 0 10px 0 0;
`;

export const ArrowContainer = styled.div`
  align-self: center;
  position: absolute;
  top: 15px;
  right: 15px;
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
