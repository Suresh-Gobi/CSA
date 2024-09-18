import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import UsersList from './components/UsersList';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Vite React GraphQL App</h1>
        <UsersList />
      </div>
    </ApolloProvider>
  );
};

export default App;
