import { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";

const TimeBox = styled.div`
  background-color: white;
  height: 50vh;
  margin: auto;
  min-width: 300px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const H1 = styled.h1`
  color: red;
  font-size: 48px;
  padding: 1rem;
  width: 80%;
  margin: auto;
  text-align: center;
`;
const BtnBox = styled.div`
  margin-bottom: 20px;
  button {
    margin: 10px;
    background: #242443;
    color: white;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      background: white;
      color: #242443;
    }
  }
`;

const useCounter = (init, ms) => {
  const [count, setCount] = useState(init);
  const intervalRef = useRef(null);
  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, ms);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(() => {
    setCount(0);
    stop();
  }, []);
  return { count, start, stop, reset };
};

const Time = () => {
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, start, stop, reset } = useCounter(0, 1000);

  const timer = () => {
    const checkMinutes = Math.floor(count / 60);
    const hours = Math.floor(count / 3600);
    const minutes = checkMinutes % 60;
    const seconds = count % 60;
    setCurrentHours(hours);
    setCurrentSeconds(seconds);
    setCurrentMinutes(minutes);
  };
  useEffect(timer, [count]);
  return (
    <TimeBox>
      <H1>
        {currentHours < 10 ? `0${currentHours}` : currentHours}:
        {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:
        {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
      </H1>
      <BtnBox>
        <button onClick={start}>START</button>
        <button onClick={stop}>STOP</button>
        <button onClick={reset}>RESET</button>
      </BtnBox>
    </TimeBox>
  );
};
export default Time;
