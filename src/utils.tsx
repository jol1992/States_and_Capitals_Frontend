import { UsState } from "./CapitalsProvider";

interface StatesAndCapResponse {
  data: UsState[];
}
export const fetchStates = async () => {
  const results = await fetch("http://localhost:3000/");
  const data: StatesAndCapResponse = await results.json();
  return data.data;
};

export const getUniqueStates = ({
  states,
  currentState,
}: {
  states: UsState[];
  currentState: UsState;
}) => {
  const choices: string[] = [];

  for (let i = 0; i < 3; i++) {
    let choice = states[Math.floor(Math.random() * 50)].capital;
    console.log({ choice });
    while (choices.includes(choice) || choice === currentState.capital) {
      choice = states[Math.floor(Math.random() * 50)].capital;
      console.log({ choice });
      console.log({ choices });
    }
    choices.push(choice);
  }
  return choices;
};
