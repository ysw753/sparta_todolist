import styled from "styled-components";

const Outter = styled.div`
  position: absolute;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #c7c7d4; ;
`;

const Spinner = () => {
  return (
    <Outter>
      <span>😅</span>
      <span>LOADING.....</span>
    </Outter>
  );
};
export default Spinner;
