import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Define the GraphQL mutation
const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!,
    $email: String!,
    $role: String!,
    $password: String!,
    $first_name: String!,
    $last_name: String!,
    $phone_number: String,
    $profile_picture: String,
    $date_of_birth: String,
    $address: String
  ) {
    registerUser(
      username: $username,
      email: $email,
      role: $role,
      password: $password,
      first_name: $first_name,
      last_name: $last_name,
      phone_number: $phone_number,
      profile_picture: $profile_picture,
      date_of_birth: $date_of_birth,
      address: $address
    ) {
      id
      username
      email
      role
    }
  }
`;

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '', // Add this if necessary
    first_name: '',
    last_name: '',
    phone_number: '',
    profile_picture: '',
    date_of_birth: '',
    address: '',
  });

  const [registerUser] = useMutation(REGISTER_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({ variables: formData });
      console.log('User registered:', data.registerUser);
      // You can redirect or perform other actions after successful registration
    } catch (error) {
      console.error('Error registering user:', error.message);
      // Handle the error (e.g., display a message to the user)
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        {/* Add other input fields as necessary */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
