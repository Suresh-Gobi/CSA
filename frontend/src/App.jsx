import React from "react";
import Home from "./pages/home/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
// import store from "./store";

import Signup from "./pages/auth/signup/signup";

function App() {
  return (
    // <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    // </Provider>
  );
}

export default App;
