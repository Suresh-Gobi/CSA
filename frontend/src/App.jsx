// App.jsx
import React from "react";
import Home from "./pages/home/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApolloProviderComponent from "./ApolloClient"; // Make sure this path is correct
import Signup from "./pages/auth/signup/signup";

function App() {
  return (
    <ApolloProviderComponent>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </ApolloProviderComponent>
  );
}

export default App;
