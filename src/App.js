import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Main, Timeline, Add } from "./screens";
import { Basic } from "./components";

function App() {
  return (
    <div className="App">
      {/* <Timeline name="" birthday=""></Timeline> */}
      {/* <Basic></Basic> */}
      <Main></Main>
    </div>
  );
}

export default App;
