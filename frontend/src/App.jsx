import React from "react";
import Home from "./pages/home/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApolloProviderComponent from "./ApolloClient";
import Signup from "./pages/auth/signup/signup";
import Login from "./pages/auth/login/login";

function App() {
  return (
    <ApolloProviderComponent>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ApolloProviderComponent>
  );
}

export default App;
