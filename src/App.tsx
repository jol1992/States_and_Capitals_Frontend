import { Link } from "react-router-dom";
import "./App.css";
import { Background } from "./Background";

export const App = () => {
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
