import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/Ntflix.jpg';

function Signup() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    fetch("http://localhost:8000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(async (res) => {
      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setTimeout(() => navigate("/"), 1500); 
      } else {
        setError(data.message);
      }
    })
    .catch((err) => {
      setError("Something went wrong. Please try again.");
    });
};

  return (
    <div
      className="relative flex items-center justify-center h-screen text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute top-6 left-8 text-4xl font-bold text-red-600">
        Netflix
      </div>

      <div className="bg-[#141414]/90 p-8 rounded-lg w-96 backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-3 mb-4 bg-gray-800 rounded"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            className="w-full p-3 mb-4 bg-gray-800 rounded"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {message && <p className="text-green-500 mb-2">{message}</p>}

          <button
            type="submit"
            className="w-full bg-red-600 p-3 rounded hover:bg-red-700 transition"
          >
            Sign Up
          </button>

          <p className="mt-6 text-gray-400 text-sm">
            Already have an account?{' '}
            <a href="/" className="text-white hover:underline">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;