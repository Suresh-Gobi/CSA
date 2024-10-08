import React, { useEffect } from "react";
import Home from "./pages/home/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ApolloProviderComponent from "./ApolloClient";
import Signup from "./pages/auth/signup/signup";
import Login from "./pages/auth/login/login";
import Dashboard from "./pages/dashboard/dashboard";

// Utility function to get query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  return (
    <ApolloProviderComponent>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </ApolloProviderComponent>
  );
}

// Component to handle protected routes (Dashboard)
function ProtectedRoute({ children }) {
  const query = useQuery();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if the token is in the query params
    const token = query.get('token');
    
    if (token) {
      // Store the token in localStorage if it's in the URL
      localStorage.setItem('token', token);
    } else if (!localStorage.getItem('token')) {
      // Redirect to login if no token is found
      navigate('/login');
    }
  }, [query, navigate]);

  return children;
}

export default App;
