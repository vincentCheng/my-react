import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function App() {
  return <div className="title">"hello world"</div>;
}

const root = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

// const a = 1;
// const b = 2;

// console.log(a+b)
// export{a,b}
