import { FC, useEffect, useState } from "react";
import styled from "styled-components";

const TimerContainer = styled.div`
  border-radius: 50px;
  height: 30px;
  width: 100%;
  background-color: transparent;
  border: 3px solid black;
  position: absolute;
  bottom: -50px;
  left: 0;
  z-index: 0;

  &::before {
    content: "";
    border-radius: 50px;
    background-color: green;
    width: 100%;
    height: 100%;
    left: 0;
    z-index: 1;
    position: absolute;
    animation: slideLeft 10s forwards;
  }

  @keyframes slideLeft {
    0% {
      background-color: green;
    }
    50% {
      background-color: purple;
    }
    70% {
      background-color: yellow;
    }
    100% {
      background-color: red;
      width: 0%;
    }
  }
`;
export const Timer: FC<{ key: string; getNewState: () => void }> = ({
  key,
  getNewState,
}) => {
  const [internalKey, setInternalKey] = useState(key);
  useEffect(() => {
    setInternalKey(key);
    const timer = setTimeout(() => {
      getNewState();
    }, 10000);

    return () => clearTimeout(timer);
  }, [key]);

  return <TimerContainer key={internalKey}></TimerContainer>;
};
