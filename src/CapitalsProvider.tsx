import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { fetchStates } from "./utils";

export interface UsState {
  state: string;
  abbr: string;
  capital: string;
  region: string;
}

interface CapitalsProps {
  states: UsState[];
  score: number;
  setStates: React.Dispatch<React.SetStateAction<UsState[]>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}
export const CapitalsContext = createContext({} as CapitalsProps);

export const CapitalsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [states, setStates] = useState<UsState[]>([]);
  const [score, setScore] = useState<number>(0);

  const getAllStates = async () => {
    const data = await fetchStates();
    setStates(data);
  };
  useEffect(() => {
    getAllStates();
  }, []);

  return (
    <CapitalsContext.Provider value={{ setStates, states, score, setScore }}>
      {children}
    </CapitalsContext.Provider>
  );
};
