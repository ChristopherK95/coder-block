import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: sticky;
  min-width: 540px;
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: -6px 6px 3px 3px rgba(0, 0, 0, 0.3);
  height: 850px;
  top: 20px;
  margin-left: 30px;
  color: white;
`;

export const UpperContainer = styled.div`
  position: relative;
  height: fit-content;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.53);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  padding: 15px 15px 5px 15px;
  overflow: ellipsis;
`;

export const MiddleContainer = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: 0px 0 0px 15px;
`;

export const BottomContainer = styled.div`
  position: relative;
  display: flex;
  height: fit-content;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 10px 0 15px 15px;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
`;

export const Title = styled.h1`
  font-size: 22px;
  margin: 0 0 5px 0;
  width: 95%;
`;

export const Occupation = styled.h2`
  font-size: 16px;
  margin: 0 0 5px 0;
  color: #dfdfdf;
`;

export const Company = styled.h2`
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #a0a0a0;
`;

export const Region = styled.h2`
  margin: 0;
`;

export const Municipality = styled.h2`
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #a0a0a0;
`;

export const Positions = styled.h2`
  position: absolute;
  bottom: 5px;
  right: 5px;
  margin: 0;
  font-size: 14px;
  display: flex;
`;

export const PublishedDate = styled.h2`
  margin: 0 0 0px 0;
  font-size: 14px;
  font-family: Epilogue-Light;
  color: #dfdfdf;
`;

export const LastApplicationDate = styled.h2`
  margin: 0 0 10px 0;
  font-size: 14px;
  font-family: Epilogue-Light;
  color: #dfdfdf;
`;

export const KeywordsContainer = styled.div`
  display: flex;
`;

export const Keyword = styled.h2`
  color: #48bf5a;
  font-size: 14px;
  margin: 0 5px 0 0;
  font-family: Epilogue-Regular;
`;

export const Description = styled.p`
  margin: 0px 100px 0px 0px;
  height: 95%;
  font-size: 14px;
  overflow: auto;
  overscroll-behavior: contain;
  overflow-x: hidden;
  white-space: break-spaces;
  width: 80%;
  padding: 15px 105px 15px 0;
  scrollbar-color: #48bf5a #171717;
  &:before {
    content: '';
    position: absolute;
    width: 95%;
    height: 15px;
    left: 0px;
    top: 0px;
    background-image: linear-gradient(0deg, rgb(28, 27, 31, 0), #1c1b1f);
  }
  &:after {
    content: '';
    position: absolute;
    width: 95%;
    height: 15px;
    left: 0px;
    bottom: 0px;
    background-image: linear-gradient(180deg, rgb(28, 27, 31, 0), #1c1b1f);
  }
`;

export const Email = styled.h2`
  margin: 0 0 10px 0;
  font-size: 14px;
  font-family: Epilogue-Light;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const ApplyLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 30px;
  margin: 0 0 0px 0;
  background: #48bf5a;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  position: relative;
  align-self: center;
  font-size: 16px;
  :hover {
    filter: brightness(1.1);
  }
  :active {
    transform: scale(0.97);
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 30px;
  margin: 0 0 0px 0;
  background: #6d6d6d;
  border: none;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  position: relative;
  align-self: center;
  font-size: 16px;
  :hover {
    filter: brightness(1.1);
  }
  :active {
    transform: scale(0.97);
  }
`;
