import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Gameboard } from "./Pages/Gamboard.tsx";
import { Background } from "./Background.tsx";
import { CapitalsProvider } from "./CapitalsProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CapitalsProvider>
      <Background />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/game" element={<Gameboard />} />
        </Routes>
      </BrowserRouter>
    </CapitalsProvider>
  </StrictMode>
);
