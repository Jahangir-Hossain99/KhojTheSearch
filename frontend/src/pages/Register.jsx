import React, { useState } from 'react';

// Main application component
const Register = () => {
  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle form submission
  const handleRegister = (e) => {
    e.preventDefault();
    // In a real application, you would handle registration logic here
    console.log('Registering with:', { email, password, confirmPassword });
    alert('Registration functionality is not implemented. See console for details.');
  };

  return (
    // Main container with dark background and centered content
    <div className="min-h-screen flex items-center justify-center font-sans text-white p-4">
      <div className="w-full mt-16 max-w-md dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Page title */}
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Create Your Account
        </h2>

        {/* Registration form */}
        <form onSubmit={handleRegister}>
          {/* Email input field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-3 rounded-md bg-[#4f5b72] border border-[#5d6881] focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password input field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-3 rounded-md bg-[#4f5b72] border border-[#5d6881] focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password input field */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="w-full p-3 rounded-md bg-[#4f5b72] border border-[#5d6881] focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Register button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300"
            type="submit"
          >
            Register
          </button>
        </form>

        {/* Link to login page */}
        <div className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-300">
            Login here.
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
