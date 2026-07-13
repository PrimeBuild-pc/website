import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const updateMotionState = () => {
  document.documentElement.classList.toggle("motion-paused", document.hidden || !document.hasFocus());
};
document.addEventListener("visibilitychange", updateMotionState);
window.addEventListener("focus", updateMotionState);
window.addEventListener("blur", updateMotionState);
updateMotionState();

createRoot(document.getElementById("root")!).render(<App />);
