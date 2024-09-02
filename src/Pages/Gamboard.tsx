import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CapitalsContext, UsState } from "../CapitalsProvider";
import { fetchStates, getUniqueStates } from "../utils";
import { GameButton } from "../GameButton";
import { Score } from "../Score";
import { Timer } from "../Timer";

const Container = styled.div`
  width: 600px;
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
  position: relative;
`;

const AnswerContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 4rem;
`;

export const Gameboard = () => {
  const { states, setStates } = useContext(CapitalsContext);
  const [buttonSelected, setButtonSelected] = useState(false);
  const getRandomIndex = () => {
    return Math.floor(Math.random() * states.length);
  };

  const [isLoaded] = useState(states.length);

  const [currentState, setCurrentState] = useState<UsState>(
    states[getRandomIndex()]
  );
  const [answers, setAnswers] = useState<string[]>(
    currentState ? getUniqueStates({ currentState, states }) : []
  );
  const [answerIndex, setAnswerIndex] = useState(0);

  const getNewState = async () => {
    const index = getRandomIndex();
    const newState = states[index];
    setCurrentState(newState);
    setAnswers(getUniqueStates({ currentState: newState, states }));
    setAnswerIndex(Math.floor(Math.random() * answers.length));
  };

  const getAllStates = async () => {
    const allStates = await fetchStates();
    setStates(allStates);
  };

  useEffect(() => {
    if (!isLoaded) {
      getAllStates();
      getNewState();
    }
  }, [isLoaded]);

  const handleClick = () => {
    getAllStates();
    getNewState();
  };

  return (
    <>
      <Score />
      {currentState ? (
        <Container>
          <h1>{currentState.state}</h1>
          <AnswerContainer>
            {answers.map((item, index) => {
              return (
                <GameButton
                  getNewState={getNewState}
                  answer={currentState.capital}
                  currentCapital={
                    answerIndex === index ? currentState.capital : item
                  }
                  answerSelected={buttonSelected}
                  setAnswerSelected={setButtonSelected}
                />
              );
            })}
          </AnswerContainer>
          <Timer key={currentState.capital} getNewState={getNewState} />
        </Container>
      ) : (
        <button onClick={handleClick}>Start</button>
      )}
    </>
  );
};
