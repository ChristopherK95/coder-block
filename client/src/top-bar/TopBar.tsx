import {
  Container,
  Content,
  Link,
  LinksContainer,
  LogoContainer,
} from './Styles';
import { ReactComponent as Logo } from '../svg/logo-title.svg';

const TopBar = () => {
  return (
    <Container>
      <Content>
        {/* <Title>CoderBlock</Title> */}
        <LogoContainer>
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
