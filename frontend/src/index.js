import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";
import metaPixel from "./lib/metaPixel";

// Initialize Meta Pixel
metaPixel.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
