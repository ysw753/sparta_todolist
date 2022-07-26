import styled from "styled-components";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
const TodoBox = styled.div`
  position:relative;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top: 1rem;
  height:500px;
  max-height: 25rem;
  overflow: auto;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 5px;
   
  }
  &::-webkit-scrollbar-thumb {
    background-color: #242443;
  }
  &::-webkit-scrollbar-track {
    background-color: #bdc3c7;
`;
const Todo = styled.div`
  margin: auto;
  margin-top: 20px;
  max-width: 500px;
  word-break: break-all;
  min-height: 30px;

  ${(props) =>
    props.deco ? `text-decoration:line-through;` : `text-decoration:none;`}
  button {
    background: none;
    border: none;
  }
  button:hover {
    cursor: pointer;
    background-color: gray;
  }
`;

const Todos = ({ datas, finishTodo, deleteTodo }) => {
  const is_loaded = useSelector((state) => state.is_loaded);
  const finishClick = (idx) => {
    finishTodo(idx);
  };
  const deleteClick = (idx) => {
    deleteTodo(idx);
  };

  return (
    <>
      <TodoBox>
        {is_loaded && <Spinner />}

        {datas?.map((data, idx) => (
          <Todo key={data.id} deco={data.finished}>
            {data.text}
            <button onClick={() => finishClick(idx)}>✔️</button>
            <button onClick={() => deleteClick(idx)}>❌</button>
          </Todo>
        ))}
      </TodoBox>
    </>
  );
};
export default Todos;
