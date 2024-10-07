import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const USER_REGISTRATION = gql`
  mutation RegisterUser(
    $username: String!,
    $email: String!,
    $password: String!,
    $role: String,
    $first_name: String,
    $last_name: String,
    $phone_number: String,
    $profile_picture: String,
    $date_of_birth: String,
    $address: String
  ) {
    registerUser(
      username: $username,
      email: $email,
      password: $password,
      role: $role,
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

const Signup = () => {
  // State for form data
  const [formDetails, setFormDetails] = useState({
    username: '',
    email: '',
    password: '',
    role: 'admin',
    first_name: '',
    last_name: '',
    phone_number: '',
    profile_picture: '',
    date_of_birth: '',
    address: '',
  });

  const [registerUser] = useMutation(USER_REGISTRATION);

  // Update form state on input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await registerUser({ variables: formDetails });
      console.log('Successfully registered user:', data.registerUser);
    } catch (error) {
      console.error('Registration error:', error); // Log the complete error object
    }
  };
  

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formDetails.username}
              onChange={handleInputChange}
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
              value={formDetails.email}
              onChange={handleInputChange}
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
              value={formDetails.password}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        {/* Additional fields can be added as needed */}
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
