import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/Ntflix.jpg';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        navigate("/success");
      } else {
        setError(data.message);
      }
    })
    .catch((err) => {
      console.error("Login error:", err);
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
        <h2 className="text-3xl font-bold mb-6">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-3 mb-4 bg-gray-800 rounded"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />
          <input
            className="w-full p-3 mb-4 bg-gray-800 rounded"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-red-600 p-3 rounded hover:bg-red-700 transition"
          >
            Sign In
          </button>

          <div className="text-center text-gray-400 my-4">OR</div>

          <button className="w-full rounded p-3 border border-gray-600 text-gray-300 hover:bg-gray-800">
            Use a sign-in code
          </button>

          <div className="flex items-center justify-between text-sm text-gray-400 mt-4">
            <div>
              <input type="checkbox" className="mr-2" /> Remember me
            </div>
            <a href="#" className="hover:underline">Forgot password?</a>
          </div>

          <p className="mt-6 text-gray-400 text-sm">
            New to Netflix?{' '}
            <a href="/signup" className="text-white hover:underline">Sign up now.</a>
          </p>

          <p className="mt-4 text-gray-500 text-xs leading-5">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
            <a href="#" className="text-blue-500 hover:underline">Learn more.</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;