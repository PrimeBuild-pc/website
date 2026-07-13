import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const hasCoarsePointer = matchMedia("(hover: none) and (pointer: coarse)").matches;
const updateMotionState = () => {
  const inactive = document.hidden || (!hasCoarsePointer && !document.hasFocus());
  document.documentElement.classList.toggle("motion-paused", inactive);
};
document.addEventListener("visibilitychange", updateMotionState);
window.addEventListener("focus", updateMotionState);
window.addEventListener("blur", updateMotionState);
updateMotionState();

createRoot(document.getElementById("root")!).render(<App />);
