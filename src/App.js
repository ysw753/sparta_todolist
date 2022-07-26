import "./App.css";
import Contents from "./components/Contents";
import Input from "./components/Input";
import Time from "./components/Time";
import Todos from "./components/Todos";
import styled from "styled-components";
const Box = styled.div`
  display: flex;
  background-color: #242443;
`;

function App() {
  return (
    <Box>
      <Time />
      <Contents>
        <Input />
        <Todos />
      </Contents>
    </Box>
  );
}

export default App;
