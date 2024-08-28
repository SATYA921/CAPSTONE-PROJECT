// Import necessary libraries
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

// Define the Login component
const Login = () => {
  // State variables for username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // UseNavigate hook to navigate between routes
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    setError(''); // Clear any previous error message

    try {
      // Send a POST request to the server for authentication
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username: username,
        password: password,
      });

      // Check the response status
      if (response.status === 200) {
        // If successful, store the auth token in local storage and navigate to the home page
        localStorage.setItem('authToken','praveen31312');
        navigate('/home');
      } else {
        // If unsuccessful, display an error message
        setError('Invalid username and password');
      }
    } catch (error) {
      // If an error occurs during the request, display an error message
      setError('Invalid username and password');
    }
  };

  // Render the login form
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-box">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span>User Name</span>
          </div>
          <div className="input-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span>Password</span>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

// Export the Login component
export default Login;