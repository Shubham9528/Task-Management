import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!username || !password) {
    setErrorMessage('Please enter both username and password.');
    return;
  }

  try {
    // Send login request to the backend
    const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_PORT}/login`, {
      username,
      password,
    });

    // If login is successful, navigate to the TaskManager route
    if (response.data.message === 'Login successful!') {
      setErrorMessage('');
      navigate('/TaskManager');
    }
  } catch (error) {
    // Check for 401 Unauthorized error
    if (error.response && error.response.status === 401) {
      setErrorMessage('Invalid username or password.');
    } else {
      console.error('Error during login:', error);
      setErrorMessage('Invalid username or password.');
    }
  }

  setUsername('');
  setPassword('');
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login to VE3 Task Manager
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">
            <p>{errorMessage}</p>
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-500 font-semibold"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
