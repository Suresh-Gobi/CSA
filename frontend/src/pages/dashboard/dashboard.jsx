import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_USER = gql`
  query {
    user {
      id
      username
      role
      email
      first_name
      last_name
      phone_number
      profile_picture
      date_of_birth
      address
    }
  }
`;

export default function Dashboard() {
  const { loading, error, data } = useQuery(GET_USER, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in the authorization header
      },
    },
  });

  if (loading) {
    return <div>Loading...</div>; // Show a loading message
  }

  if (error) {
    console.error(error);
    return <div>Error: {error.message}</div>; // Show an error message
  }

  const user = data.user;

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.first_name} {user.last_name}!</h2>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Role: {user.role}</p>
          <p>Phone Number: {user.phone_number || 'N/A'}</p>
          <p>Date of Birth: {user.date_of_birth || 'N/A'}</p>
          <p>Address: {user.address || 'N/A'}</p>
          {/* Display other user details as needed */}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}
