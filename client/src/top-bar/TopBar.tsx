import {
  Container,
  Link,
  Content,
  LinksContainer,
  LogoContainer,
} from './Styles';
import { ReactComponent as Logo } from '../svg/logo-title.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const TopBar = (props: { scroll?: () => void }) => {
  const nav = useNavigate();
  const loc = useLocation();

  const ScrollTop = () => {
    if (loc.pathname.includes('job')) {
      nav('/');
    } else {
      if (props.scroll) props.scroll();
    }
  };

  return (
    <Container>
      <Content>
        {/* <Title>CoderBlock</Title> */}
        <LogoContainer onClick={ScrollTop}>
          <Logo />
        </LogoContainer>
        <LinksContainer>
          <Link>Jobs</Link>
          <Link>Statistics</Link>
        </LinksContainer>
      </Content>
    </Container>
  );
};

export default TopBar;
