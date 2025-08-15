import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

if (import.meta.env.DEV) {
  (async () => {
    // dynamic import so it’s dev-only
    const axe = (await import("@axe-core/react")).default;
    // get the module object (not .default) in React 18 ESM
    const ReactDOM = await import("react-dom");
    axe(React, ReactDOM, 1000); // 1000ms debounce
  })();
}

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);