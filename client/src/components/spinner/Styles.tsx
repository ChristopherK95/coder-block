import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 50px;
  height: 50px;
  z-index: 100;
  bottom: 50px;
  right: 50px;
`;

export const Ring = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid #ffffff1f;
  box-sizing: border-box;
`;

export const InnerRing = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border-left: 5px solid #48bf5a;
  position: absolute;
  box-sizing: border-box;
  border-right: 5px solid transparent;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
`;
