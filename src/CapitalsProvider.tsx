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
  setStates: React.Dispatch<React.SetStateAction<UsState[]>>;
}
export const CapitalsContext = createContext({} as CapitalsProps);

export const CapitalsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [states, setStates] = useState<UsState[]>([]);

  const getAllStates = async () => {
    const data = await fetchStates();
    setStates(data);
  };
  useEffect(() => {
    getAllStates();
  }, []);

  return (
    <CapitalsContext.Provider value={{ setStates, states }}>
      {children}
    </CapitalsContext.Provider>
  );
};
