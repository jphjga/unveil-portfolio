import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AnimationProvider } from "./contexts/AnimationContext";

createRoot(document.getElementById("root")!).render(
  <AnimationProvider>
    <App />
  </AnimationProvider>
);
