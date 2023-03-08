import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "@/components/error-boundary/lego";
import App from "./app";
import "../public/index.css";

// function App() {
//   return <div className="title">"hello world"</div>;
// }

const root = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  root
);
