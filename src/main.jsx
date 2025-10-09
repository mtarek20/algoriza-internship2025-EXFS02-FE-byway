import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "jotai";
import StayLoged from "./Services/StayLoged.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <StayLoged>
        <App />
      </StayLoged>
    </Provider>
  </StrictMode>
);
