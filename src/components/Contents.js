import styled from "styled-components";
import Input from "./Input";
import Todos from "./Todos";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoFB,
  completedTodo,
  createTodo,
  deleteTodoFB,
  loadBucketFB,
  loadTodo,
  removeTodo,
  updateTodoFB,
} from "../redux/datatodo";
import Progressbar from "./Progressbar";

import { useEffect } from "react";
const MainBox = styled.div`
  background-color: white;
  margin: 2rem;
  margin-right: 8em;
  height: 90vh;
  min-width: 600px;
  border-radius: 50px;
  text-align: center;
`;

const Contents = () => {
  const todos = useSelector((state) => state.todo.dummy);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadBucketFB());
  }, [todos]);

  //const [todos, setTodos] = useState(dummyData);

  const addTodo = (data) => {
    // setTodos((prev) => {
    //   return [...prev, { text: data, finished: false }];
    // });

    if (data === "") return;
    //dispatch(createTodo({ text: data, finished: false }));
    dispatch(addTodoFB({ text: data, finished: false }));
  };
  const finishTodo = (idx) => {
    const updatedTodo = todos.map((todo, i) =>
      i === idx ? { ...todo, finished: true } : todo
    );
    // setTodos(updatedTodo);
    dispatch(updateTodoFB(updatedTodo[idx].id));
  };
  const deleteTodo = (idx) => {
    //console.log(idx); //0
    const updatedTodo = todos.filter((todo, i) => i == idx);
    //console.log(updatedTodo);
    // setTodos(updatedTodo);
    dispatch(deleteTodoFB(updatedTodo[idx].id));
  };
  return (
    <MainBox>
      <Input addTodo={addTodo} />
      <Progressbar />
      <Todos datas={todos} finishTodo={finishTodo} deleteTodo={deleteTodo} />
    </MainBox>
  );
};
export default Contents;
