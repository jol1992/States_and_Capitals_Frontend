import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CapitalsContext, UsState } from "../CapitalsProvider";
import { fetchStates, getUniqueStates } from "../utils";
import { GameButton } from "../GameButton";
import { Score } from "../Score";

const Container = styled.div`
  width: 100%;
  background-color: red;
  border-radius: 5px;
  padding: 4rem;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const AnswerContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 4rem;
`;

export const Gameboard = () => {
  const { states, setStates } = useContext(CapitalsContext);
  const getRandomIndex = () => {
    return Math.floor(Math.random() * states.length);
  };

  const [currentState, setCurrentState] = useState<UsState>(
    states[getRandomIndex()]
  );
  const question = currentState?.state;

  const getNewState = () => {
    const index = getRandomIndex();
    setCurrentState(states[index]);
  };

  const answers: string[] = currentState
    ? getUniqueStates({ currentState, states })
    : [];
  const answerIndex = Math.floor(Math.random() * answers.length);
  const getAllStates = async () => {
    const allStates = await fetchStates();
    setStates(allStates);
  };

  useEffect(() => {
    if (!states.length) {
      getAllStates();
      getNewState();
    }
  }, []);

  const handleClick = () => {
    getAllStates();
    getNewState();
  };

  return (
    <>
      <Score />
      {currentState ? (
        <Container>
          <h1>{question}</h1>
          <AnswerContainer>
            {answers.map((item, index) => {
              return (
                <GameButton
                  getNewState={getNewState}
                  answer={currentState.capital}
                  currentCapital={
                    answerIndex === index ? currentState.capital : item
                  }
                />
              );
            })}
          </AnswerContainer>
        </Container>
      ) : (
        <button onClick={handleClick}>Start</button>
      )}
    </>
  );
};
