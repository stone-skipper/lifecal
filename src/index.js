import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Main, Timeline, Add, TimelineView } from "./screens";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <Route exact path="/" component={Main}></Route>
    <Route path="/timeline" component={Timeline}></Route>
    <Route path="/add" component={Add}></Route>
    <Route path="/timelineView" component={TimelineView}></Route>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
