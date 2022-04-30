import { StyledTooltip } from './Styles';

const Tooltip = (props: { children: React.ReactNode; visible: boolean }) => {
  if (props.visible) return <StyledTooltip>{props.children}</StyledTooltip>;
  return <></>;
};

export default Tooltip;
