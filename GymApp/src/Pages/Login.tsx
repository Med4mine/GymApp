"use client";

import type React from "react";
import axios from "axios";
import { useState } from "react";
import { useSecurityContext } from "../Context/SecurityContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {
  const Navigate = useNavigate();
  const { setAccessToken } = useSecurityContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const LoginPerson = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );

    const accessToken = res.data.AccessToken;
    setAccessToken(accessToken);
    if (res.data.AccessToken) Navigate("/admin-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <form
          onSubmit={LoginPerson}
          className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username:
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password:
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Login
            </button>
            <Link
              to="/register"
              className="w-full inline-block bg-green-600 hover:bg-green-700 text-white text-center font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 mt-4"
            >
              Go to Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
