import { Link } from "react-router-dom";
import "./App.css";
import { Background } from "./Background";
import { useContext, useEffect } from "react";
import { CapitalsContext } from "./CapitalsProvider";

export const App = () => {
  const { setScore } = useContext(CapitalsContext);
  useEffect(() => {
    setScore(0);
  }, []);
  return (
    <div>
      <Background />
      <div style={{ position: "relative" }}>
        <h1>States and Capitals</h1>
        <button>
          <Link to="/game">Play</Link>
        </button>
      </div>
    </div>
  );
};
