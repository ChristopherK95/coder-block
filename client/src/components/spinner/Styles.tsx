import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  z-index: 100;
  align-self: center;
  top: 125%;
`;

export const Ring = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 20px solid #ffffff1f;
  box-sizing: border-box;
`;

export const InnerRing = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border-left: 20px solid #48bf5a;
  position: absolute;
  box-sizing: border-box;
  border-right: 20px solid transparent;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
`;
