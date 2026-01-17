import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;

// Check if the page was pre-rendered (SSG)
// If there's content in root, hydrate; otherwise create new root
if (rootElement.innerHTML.trim() && rootElement.innerHTML !== "<!--app-html-->") {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
