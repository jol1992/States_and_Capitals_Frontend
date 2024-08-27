import { FC } from "react";
import styled from "styled-components";

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
  const handleClick = () => {
    getNewState();
  };
  return <StyledButton onClick={handleClick}>{currentCapital}</StyledButton>;
};
