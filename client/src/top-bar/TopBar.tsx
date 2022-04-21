import { Container, Content, Link, LinksContainer, Title } from './Styles';

const TopBar = () => {
  return (
    <Container>
      <Content>
        <Title>CoderBlock</Title>
        <LinksContainer>
          <Link>Jobs</Link>
          <Link>Statistics</Link>
        </LinksContainer>
      </Content>
    </Container>
  );
};

export default TopBar;
