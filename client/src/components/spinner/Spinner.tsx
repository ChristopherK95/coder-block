import { Container, InnerRing, Ring } from './Styles';

const Spinner = () => {
  return (
    <Container>
      <Ring>
        <InnerRing
          transition={{
            // type: 'tween',
            repeat: Infinity,
            // ease: 'easeIn',
            duration: 1,
            repeatDelay: 0.1,
          }}
          animate={{ rotate: 360 }}
        />
      </Ring>
    </Container>
  );
};

export default Spinner;
