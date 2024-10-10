import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "./router";
import "./index.css";

createRoot(document.getElementById("root")).render(<Root />);
