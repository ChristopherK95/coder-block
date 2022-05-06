import { Container, Text } from './Styles';
import noData from '../../GIFs/no-data.gif';

const EmptyResult = () => {
  return (
    <>
      <Container>
        <Text>Sorry, no jobs found...</Text>
        <img src={noData} />
      </Container>
    </>
  );
};

export default EmptyResult;
