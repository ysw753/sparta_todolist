import styled from "styled-components";
import { useSelector } from "react-redux";

const Bar = styled.div`
  margin: auto;
  margin-top: 20px;

  width: 80%;
  height: 5px;
  border-radius: 5px;
  border: 0.5px solid #242443;

  display: flex;
  align-items: center;
`;
const Highlight = styled.div`
  background-color: #242443;
  transition: 1s;
  width: ${(props) => props.width};
  height: 5px;
  border-radius: 5px;
  margin: 0;
  padding: 0;
`;
const Dot = styled.div`
  width: 10px;
  height: 10px;
  background: #fff;
  border: 3px solid #242443;
  border-radius: 10px;
  margin: 0px -5px 0px -5px;
`;
const Progressbar = () => {
  const todos = useSelector((state) => state.todo.dummy);
  let count = 0;
  todos.map((todo) => {
    if (todo.finished) {
      count++;
    }
  });

  return (
    <Bar>
      <Highlight width={(count / todos.length) * 100 + "%"} />
      <Dot />
    </Bar>
  );
};
export default Progressbar;
