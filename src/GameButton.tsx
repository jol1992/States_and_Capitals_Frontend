import { FC, useContext } from "react";
import styled from "styled-components";
import { CapitalsContext } from "./CapitalsProvider";

interface ButtonProps {
  getNewState: () => void;
  answer: string;
  currentCapital: string;
}

const StyledButton = styled.button``;

export const GameButton: FC<ButtonProps> = ({
  getNewState,
  answer,
  currentCapital,
}) => {
  const { setScore } = useContext(CapitalsContext);
  const handleScore = () => {
    if (answer === currentCapital) {
      setScore((a) => a + 1);
    }
  };
  const handleClick = () => {
    handleScore();
    getNewState();
  };
  return <StyledButton onClick={handleClick}>{currentCapital}</StyledButton>;
};
