import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Game from "./components/Game";

function App() {
  return (
    <Router>
      <Header />
      <Home />
      <Routes>
        <Route path="/" />
        <Route path={"/games/:id"} element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
