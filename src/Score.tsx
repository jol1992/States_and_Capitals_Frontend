import { useContext } from "react";
import { CapitalsContext } from "./CapitalsProvider";
import styled from "styled-components";

const Wrapper = styled.div``;
export const Score = () => {
  const { score } = useContext(CapitalsContext);
  return <Wrapper>Score: {score}</Wrapper>;
};
