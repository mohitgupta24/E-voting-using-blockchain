import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Apps from "./Apps";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  // <React.StrictMode>
  //   {/* <BrowserRouter> */}
  //   <Apps />
  //   {/* </BrowserRouter> */}
  // </React.StrictMode>,
  // document.getElementById("root")
  <React.StrictMode>
    <Router>
      <Apps />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
