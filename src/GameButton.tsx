import { FC, useContext, useState } from "react";
import styled from "styled-components";
import { CapitalsContext } from "./CapitalsProvider";

interface ButtonProps {
  getNewState: () => void;
  answer: string;
  currentCapital: string;
  answerSelected: boolean;
  setAnswerSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledButton = styled.button<{ color: string }>`
  all: unset;
  color: black;
  flex: 1;
  padding: 1rem;
  border-radius: 2px;
  cursor: pointer;
  border: none;
  outline: none;
  ${({ color }) => color && `background-color:${color}`}
`;

export const GameButton: FC<ButtonProps> = ({
  getNewState,
  answer,
  currentCapital,
  answerSelected,
  setAnswerSelected,
}) => {
  const { setScore } = useContext(CapitalsContext);
  const isCorrect = answer === currentCapital;
  const [backgroundColor, setBackgroundColor] = useState("#f9f9f9");
  const handleScore = () => {
    if (isCorrect) {
      setScore((a) => a + 1);
    }
    setBackgroundColor(isCorrect ? "#97BE5A" : "red");
  };
  const handleClick = () => {
    setAnswerSelected(true);
    handleScore();
    resetButton();
  };

  const resetButton = () => {
    const timeout = setTimeout(() => {
      setBackgroundColor("#f9f9f9");
      setAnswerSelected(false);
      getNewState();
    }, 2000);

    return () => clearTimeout(timeout);
  };

  return (
    <StyledButton
      color={backgroundColor}
      onClick={handleClick}
      disabled={answerSelected}
    >
      {currentCapital}
    </StyledButton>
  );
};
