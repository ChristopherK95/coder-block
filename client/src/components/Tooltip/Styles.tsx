import styled from 'styled-components';

export const StyledTooltip = styled.div`
  font-family: Epilogue-Bold;
  position: absolute;
  width: fit-content;
  height: fit-content;
  padding: 10px;
  background-color: #2a2a2b;
  bottom: 35px;
  right: 5px;
  transform: translateX(100%);
  color: #48bf5a;
  box-shadow: -3px 0px 3px 3px rgba(0, 0, 0, 0.5);
  border-radius: 5px 5px 5px 0px;
  :after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 15px solid #2a2a2b;
    bottom: -6px;
    left: -6px;
    filter: drop-shadow(-3px 6px 3px rgba(0, 0, 0, 0.5));
    border-radius: 5px 5px 0 0;
    transform: rotate(35deg);
  }
`;

export const TooltipText = styled.span``;
