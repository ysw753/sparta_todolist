import { useRef, useState } from "react";
import styled from "styled-components";

const InputBox = styled.input`
  width: 60%;
  height: 30px;
  text-align: center;
  border: none;
  border-bottom: solid 1px #242443;
`;
const Btn = styled.button`
  height: 30px;
  background-color: white;
  &:hover {
    background-color: #242443;
    color: white;
    cursor: pointer;
  }
  margin-left: 10px;
`;
const Box = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Input = ({ addTodo }) => {
  const inputRef = useRef();
  const clickHandler = () => {
    addTodo(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <Box>
      <InputBox ref={inputRef} placeholder="오늘의 할일을 적어주세요!" />
      <Btn onClick={clickHandler}>추가</Btn>
    </Box>
  );
};
export default Input;
