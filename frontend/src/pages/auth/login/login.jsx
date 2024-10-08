import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

// GraphQL mutation to log in the user
const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { email, password } });
      const token = data.loginUser.token;

      // Store the token in localStorage
      localStorage.setItem('token', token);
      console.log('Login successful:', data.loginUser);

      // Redirect to /dashboard with the token as a query parameter
      navigate(`/dashboard?access=${token}`);
      
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Handle error messages from the server
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message }) => {
          console.error('GraphQL error:', message);
        });
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
