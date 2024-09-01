import { FC, useContext, useState } from "react";
import styled from "styled-components";
import { CapitalsContext } from "./CapitalsProvider";

interface ButtonProps {
  getNewState: () => void;
  answer: string;
  currentCapital: string;
}

const StyledButton = styled.button<{ color: string }>`
  ${({ color }) => color && `background-color:${color}`}
`;

export const GameButton: FC<ButtonProps> = ({
  getNewState,
  answer,
  currentCapital,
}) => {
  const { setScore } = useContext(CapitalsContext);
  const isCorrect = answer === currentCapital;
  const [backgroundColor, setBackgroundColor] = useState("#f9f9f9");
  const handleScore = () => {
    if (isCorrect) {
      setScore((a) => a + 1);
    }
    setBackgroundColor(isCorrect ? "green" : "red");
  };
  const handleClick = () => {
    handleScore();
    resetButton();
  };

  const resetButton = () => {
    const timeout = setTimeout(() => {
      setBackgroundColor("#f9f9f9");
      getNewState();
    }, 2000);

    return () => clearTimeout(timeout);
  };

  return (
    <StyledButton color={backgroundColor} onClick={handleClick}>
      {currentCapital}
    </StyledButton>
  );
};
