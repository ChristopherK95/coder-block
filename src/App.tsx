import "./App.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c2026;
  width: 100vw;
  height: 100vh;
`;

const SearchBar = styled.input`
  width: 500px;
  height: 40px;
  border-radius: 10px;
  background-color: white;
  border: none;
  box-shadow: -3px 3px 3px 3px rgba(0, 0, 0, 0.5);
  font-size: 20px;
  padding: 0 10px;
  box-sizing: border-box;
`;

function App() {
  return (
    <Container>
      <SearchBar />
    </Container>
  );
}

export default App;
